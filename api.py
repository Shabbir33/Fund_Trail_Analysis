from flask import Flask, request, jsonify, session
import pandas as pd
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
        df = pd.read_csv(file)
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
    deposits = df[(df["Deposit Amount"] > 0) & (df["Sender Account Number"] == 0)]
    deposits = df[df['Deposit Amount'] > 0]
    depositsAmt = list(deposits["Deposit Amount"])
    transactionID = list(deposits["Transaction ID"])
    result = convertDict(transactionID, depositsAmt)
    print(result)
    return result

def getWithdrawals(data):
    df = pd.DataFrame(data)
    withdrawals = df[(df["Withdrawal Amount"] > 0) & (df["Sender Account Number"] == 0)]
    withdrawals = df[df['Withdrawal Amount'] > 0]
    withdrawalsAmt = list(withdrawals["Withdrawal Amount"])
    transactionID = list(withdrawals["Transaction ID"])
    result = convertDict(transactionID, withdrawalsAmt)
    print(result)
    return result

def getBalance(data):
    df = pd.DataFrame(data)
    balance = df[(df["Balance Amount"] > 0) & (df["Sender Account Number"] == 0)]
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
    txid = accTran.find_one({"accID": str(accNo)})["tranID"]
    assets = bdb.transactions.get(asset_id=txid)[0]['asset']['data'][str(accNo)]
    print(assets)
    data = json.loads(assets)
    response = jsonify(data)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response


app.run(debug=True)