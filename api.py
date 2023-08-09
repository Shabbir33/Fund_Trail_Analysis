from flask import Flask, request, jsonify, session
import pandas as pd
import numpy as np
import os
import codecs
import csv
from flask_cors import CORS, cross_origin
import json
import datetime
#from analyzer import *

from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair

from pymongo import MongoClient

#Machine Learning
from sklearn.ensemble import IsolationForest
from sklearn.svm import OneClassSVM
from sklearn.decomposition import PCA

from sklearn.cluster import KMeans
from sklearn.neighbors import LocalOutlierFactor
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense

import tensorflow as tf

from dash_for_integration import *



def scale_data(df):
    # Fill NaN values with 0 or any appropriate value based on the context
    df = df.fillna(0)

    # Convert Amount column to numeric (float) to handle any non-numeric values
    df['Amount'] = pd.to_numeric(df['Amount'], errors='coerce')

    # Convert Transaction_ID column to integers
    df['Transaction ID'] = df['Transaction ID'].astype(int)

    # Select only numeric columns for scaling
    numeric_cols = ["Transaction ID", "Amount"]

    # Handle non-numeric columns (e.g., drop or encode them)
    # non_numeric_cols = ["Transaction ID", "Amount"]
    # if len(non_numeric_cols) > 0:
    #     print("Non-numeric columns found:", non_numeric_cols)
    #     # we can choose to drop non-numeric columns if they are not essential for the analysis.
    #     df = df.drop(columns=non_numeric_cols)

        # Alternatively, we can encode categorical columns using techniques like one-hot encoding.

    # Print basic information about the DataFrame before scaling
    print("Before scaling:")
    print(df[numeric_cols].dtypes)

    # Scaling the data using Min-Max scaling (Normalization) for selected columns
    df_scaled = (df[numeric_cols] - df[numeric_cols].min()) / (df[numeric_cols].max() - df[numeric_cols].min())

    # Replace the scaled values in the original DataFrame
    df[numeric_cols] = df_scaled

    # Check for NaN values
    if df_scaled.isnull().any().any():
        print("NaN values found in the DataFrame.")

    # Print basic information about the DataFrame after scaling
    print("After scaling:")
    print(df[numeric_cols].dtypes)
    print(df)

    return df[["Transaction ID", "Amount"]]


# Step 3: Train an Autoencoder for outlier detection
def train_autoencoder(df_scaled):
    # Get the number of features (columns) in the DataFrame
    num_features = len(df_scaled.columns)
    # Build an Autoencoder model (modify architecture based on your data)
    input_layer = tf.keras.Input(shape=(num_features,))
    encoded = Dense(14, activation='relu')(input_layer)
    encoded = Dense(7, activation='relu')(encoded)
    decoded = Dense(14, activation='relu')(encoded)
    decoded = Dense(len(df_scaled.columns), activation='sigmoid')(decoded)
    autoencoder = Model(input_layer, decoded)

    # Compile and fit the Autoencoder to the scaled data
    autoencoder.compile(optimizer='adam', loss='mean_squared_error')
    autoencoder.fit(df_scaled, df_scaled, epochs=50)

    # Extract the encoder part of the Autoencoder
    encoder = Model(inputs=input_layer, outputs=encoded)

    # Obtain the encoded representation of the data
    encoded_data = encoder.predict(df_scaled)

    # Use the Autoencoder to reconstruct the data and calculate the Mean Squared Error (MSE)
    mse = ((df_scaled - autoencoder.predict(df_scaled)) ** 2).mean(axis=1)

    return mse

def train_isolation_forest(df_scaled):
    # Train the Isolation Forest model
    isolation_forest_model = IsolationForest(contamination=0.05, random_state=42)
    isolation_forest_model.fit(df_scaled)
    outliers_isolation_forest = isolation_forest_model.fit_predict(df_scaled)
    outliers_isolation_forest = set(df_scaled.index[outliers_isolation_forest == -1])

    return outliers_isolation_forest

# Step 4: Train outlier detection models (Isolation Forest, One-Class SVM, Local Outlier Factor)
def train_outlier_detection_models(df_scaled):

    # Train the Autoencoder model for outlier detection
    # mse_scores = train_autoencoder(df_scaled)

    # Determine a threshold for the Autoencoder MSE scores to classify outliers
    # mse_threshold = np.percentile(mse_scores, 95)

    # Train the Isolation Forest model
    outliers_isolation_forest = train_isolation_forest(df_scaled)

    # Train the K-means clustering model
    kmeans_model = KMeans(n_clusters=2, random_state=42)
    clusters = kmeans_model.fit_predict(df_scaled)

    # Generate outlier predictions based on the MSE threshold
    # outliers_autoencoder = set(df_scaled.index[mse_scores > mse_threshold])

    # Train the One-Class SVM model
    svm_model = OneClassSVM(nu=0.05)
    svm_model.fit(df_scaled)  # Fit the model to the data
    outliers_svm = set(df_scaled.index[svm_model.predict(df_scaled) == -1])

    # Train the Local Outlier Factor model
    lof_model = LocalOutlierFactor(n_neighbors=20, contamination=0.05)
    outliers_lof = set(df_scaled.index[lof_model.fit_predict(df_scaled) == -1])

    # Perform PCA for visualization
    pca = PCA(n_components=2)
    pca_result = pca.fit_transform(df_scaled)
    pca_df = pd.DataFrame(data=pca_result, columns=['PCA1', 'PCA2'])

    return outliers_isolation_forest, outliers_svm, outliers_lof, clusters, pca_df


def visualize_clusters(df, clusters, outliers_svm, outliers_lof,outliers_isolation_forest):
    # Perform PCA for visualization
    pca = PCA(n_components=2)
    pca_result = pca.fit_transform(df)

    pca_df = pd.DataFrame(data=pca_result, columns=['PCA1', 'PCA2'])

    # Mark outliers detected by the autoencoder
    # pca_df['Outlier_Autoencoder'] = 0
    # pca_df.loc[pca_df.index.isin(outliers_autoencoder), 'Outlier_Autoencoder'] = 1

    # Mark outliers detected by SVM
    pca_df['Outlier_SVM'] = 0
    pca_df.loc[pca_df.index.isin(outliers_svm), 'Outlier_SVM'] = 1

    # Mark outliers detected by LOF
    pca_df['Outlier_LOF'] = 0
    pca_df.loc[pca_df.index.isin(outliers_lof), 'Outlier_LOF'] = 1

    # Mark outliers detected by Isolation Forest
    pca_df['Outlier_IsolationForest'] = 0
    pca_df.loc[pca_df.index.isin(outliers_isolation_forest), 'Outlier_IsolationForest'] = 1

    print(convertDict(pca_df['PCA1'], pca_df['PCA2']))

    return convertDict(pca_df['PCA1'], pca_df['PCA2']), list(pca_df['Outlier_LOF'])






def getFileExtension(filePath):
    ext = os.path.splitext(filePath)[1]
    # filename = os.path.splitext(os.path.basename(filePath))[0]
    return ext


def extractData(file, filename):
    ext = getFileExtension(filename)
    if (not (ext in [".txt", ".csv", ".pdf", ".xlsx", ".xlsm"])):
        print("Error: Wrong file type - ", ext)
        return

    df = pd.DataFrame()

    if (ext == ".csv"):
        df = pd.read_csv(filename, sep=',')
    elif (ext == ".xlsx" or ext == ".xlsm"):
        # df = pd.DataFrame(openpyxl.load_workbook(filePath).active)
        df = pd.read_excel(file, engine='openpyxl')
    elif (ext == ".pdf"):
        # working for the pdf extraction
        return

    print(df)
    return df


def convertDict(keys, data):
    result = {}
    for i in range(len(keys)):
        result[keys[i]] = data[i]
    return result

def getAccountNumbers(df):
    accNo = list(df["Account Number"].unique())
    for i in range(len(accNo)):
        accNo[i] = str(accNo[i])
    return accNo

def getSingleAccountNumber(df):
    accNo = list(df["Account Number"].unique())
    # for i in range(len(accNo)):
    #     accNo[i] = str(accNo[i])
    return str(accNo[0])

def getSepAccountData(df, accNo, sessionData):
    if sessionData == None:
        print("No Data")
        accounts = {}
    else:
        print("Data Present")
        accounts = sessionData
    print("accounts : " , accounts)
    for i in range(len(accNo)):
        accounts[accNo[i]] = df[df["Account Number"] == int(accNo[i])].to_dict()
    
    return accounts


def getDeposits(data):
    df = pd.DataFrame(data)
    deposits = df[((df["Type"] == 1) | (df["Type"] == 3))]
    depositsAmt = list(deposits["Amount"])
    transactionID = list(deposits["Transaction ID"])
    result = convertDict(transactionID, depositsAmt)
    print(result)
    return result

def getWithdrawals(data):
    df = pd.DataFrame(data)
    withdrawals = df[(df["Type"] == 2) | (df["Type"] == 4)]
    withdrawalsAmt = list(withdrawals["Amount"])
    transactionID = list(withdrawals["Transaction ID"])
    result = convertDict(transactionID, withdrawalsAmt)
    print(result)
    return result

def getBalance(data):
    df = pd.DataFrame(data)
    balance = df[df['Balance Amount'] > 0]
    balanceAmt = list(balance["Balance Amount"])
    transactionID = list(balance["Transaction ID"])
    result = convertDict(transactionID, balanceAmt)
    print(result)
    return result



# Define a custom function to serialize datetime objects
def serialize_datetime(obj):
    if isinstance(obj, datetime.datetime):
        return obj.isoformat()
    raise TypeError("Type not serializable")




#*****************************************************   BigChainDB      ***********************************************************************
bdb_root_url = 'http://localhost:9984'

bdb = BigchainDB(bdb_root_url)

alice, bob = generate_keypair(), generate_keypair()


def createTransaction(data):
    prepared_creation_tx = bdb.transactions.prepare(
        operation='CREATE',
        signers=alice.public_key,
        asset={"data" : data},
    ) 

    fulfilled_creation_tx = bdb.transactions.fulfill(
        prepared_creation_tx, private_keys=alice.private_key
    )

    print(fulfilled_creation_tx)

    sent_creation_tx = bdb.transactions.send_commit(fulfilled_creation_tx)
    print(sent_creation_tx == fulfilled_creation_tx)

    txid = fulfilled_creation_tx['id']
    print(txid)

    assets = bdb.transactions.get(asset_id=txid)
    print(assets[0]['asset'])

    return [assets[0]['asset'], txid]





app = Flask(__name__)
# CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.secret_key = 'any random string'


#************************************************************  MongoDB Local    ***********************************************************
client = MongoClient('localhost', 27017)

db = client.flask_db
accTran = db.accTran




@app.route('/')
def hello():
	return "{'status':'success'}'"

@app.route('/upload_csv', methods=['POST'])
@cross_origin(origins="*", supports_credentials=True)
def csv_handler():
    csv = 'financial_data.csv'
    execute(csv)
    f = request.files['file']
    fname = f.filename 
    f.save(f.filename)
    ext = getFileExtension(fname)
    df =  extractData(f, fname)
    dfNull = df.fillna(0)
    
    #Send to BigChainDB as a Dictionary
    singleAccNo = getSingleAccountNumber(dfNull)

    print(json.dumps(dfNull.to_dict(), default=serialize_datetime))

    bdbAsset = createTransaction({str(singleAccNo): str(json.dumps(dfNull.to_dict(), default=serialize_datetime))})

    print(bdbAsset)

    accTran.insert_one({"accID": singleAccNo, "tranID": bdbAsset[1]})

    # accNo = getAccountNumbers(dfNull)
    # print("session: ", 'data' in session.keys())
    # if('data' in session.keys() == True):
    #     print("data : ", session['data'])
    #     dfFinal = getSepAccountData(dfNull, accNo, session['data'])
    # else:
    #     dfFinal = getSepAccountData(dfNull, accNo, None)
    # session['data'] = dfFinal
    # session['AccNo'] = accNo
    # print(session['data'])
    response =  jsonify(bdbAsset[0])
    return response

@app.route('/get-account-numbers', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True)
def get_account_number():
    data = accTran.find({})
    result = []
    for doc in data:
        result.append(str(doc["accID"]))
    # print(type(accNo))
    response = jsonify({"AccNo":result})
    return response

@app.route('/deposits-amount/<accNo>', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def deposits_amount(accNo):
    txid = accTran.find_one({"accID": str(accNo)})["tranID"]
    assets = bdb.transactions.get(asset_id=txid)[0]['asset']['data'][str(accNo)]
    print(assets)
    data = json.loads(assets)
    #data = session['data']
    result = getDeposits(data)
    response = jsonify(result)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/withdrawals-amount/<accNo>', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def withdrawals_amount(accNo):
    txid = accTran.find_one({"accID": str(accNo)})["tranID"]
    assets = bdb.transactions.get(asset_id=txid)[0]['asset']['data'][str(accNo)]
    print(assets)
    data = json.loads(assets)
    #data = session['data']
    result = getWithdrawals(data)
    response = jsonify(result)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/balance-amount/<accNo>', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def balance_amount(accNo):
    txid = accTran.find_one({"accID": str(accNo)})["tranID"]
    assets = bdb.transactions.get(asset_id=txid)[0]['asset']['data'][str(accNo)]
    print(assets)
    data = json.loads(assets)
    #data = session['data']
    result = getBalance(data)
    response = jsonify(result)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/get-transactions/<accNo>', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def get_transactions(accNo):
    # accTranData = accTran.find({})
    # print("accTran Data: ", accTranData)
    txid = accTran.find_one({"accID": str(accNo)})["tranID"]
    assets = bdb.transactions.get(asset_id=txid)[0]['asset']['data'][str(accNo)]
    print(assets)
    data = json.loads(assets)
    response = jsonify(data)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/get-all-transactions', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def get_all_transactions():
    result = {}
    accTranData = list(accTran.find())
    for data in accTranData:
        accNo = data["accID"]
        txid = accTran.find_one({"accID": str(accNo)})["tranID"]
        assets = bdb.transactions.get(asset_id=txid)[0]['asset']['data'][str(accNo)]
        result[accNo] = assets


    
    # txid = accTran.find_one({"accID": str(accNo)})["tranID"]
    # assets = bdb.transactions.get(asset_id=txid)[0]['asset']['data'][str(accNo)]
    # print(assets)
    # data = json.loads(assets)
    response = jsonify(result)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/ml-graph/<accNo>', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def ml_graph(accNo):
    txid = accTran.find_one({"accID": str(accNo)})["tranID"]
    assets = bdb.transactions.get(asset_id=txid)[0]['asset']['data'][str(accNo)]
    print(assets)
    data = json.loads(assets)
    df = pd.DataFrame(data)

    
    financial_data_scaled = scale_data(df)

    # Step 4: Train outlier detection models (Isolation Forest, One-Class SVM, Local Outlier Factor)
    outliers_isolation_forest, outliers_svm, outliers_lof, clusters, pca_df = train_outlier_detection_models(financial_data_scaled)

    # Step 6: Combine outlier detection results
    result, svm = visualize_clusters(pca_df, clusters, outliers_svm, outliers_lof,outliers_isolation_forest)


    response = jsonify({"result": result, "svm": svm})
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response



app.run(debug=True)