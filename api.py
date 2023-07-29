from flask import Flask, request, jsonify, session
import pandas as pd
import os
import codecs
import csv
from flask_cors import CORS, cross_origin
#from analyzer import *

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
        df = pd.read_excel(file)
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


def getDeposits(data, accNo):
    df = pd.DataFrame(data[accNo])
    deposits = df[(df["Deposit Amount"] > 0) & (df["Sender Account Number"] == 0)]
    deposits = df[df['Deposit Amount'] > 0]
    depositsAmt = list(deposits["Deposit Amount"])
    transactionID = list(deposits["Transaction ID"])
    result = convertDict(transactionID, depositsAmt)
    print(result)
    return result

def getWithdrawals(data, accNo):
    df = pd.DataFrame(data[accNo])
    withdrawals = df[(df["Withdrawal Amount"] > 0) & (df["Sender Account Number"] == 0)]
    withdrawals = df[df['Withdrawal Amount'] > 0]
    withdrawalsAmt = list(withdrawals["Withdrawal Amount"])
    transactionID = list(withdrawals["Transaction ID"])
    result = convertDict(transactionID, withdrawalsAmt)
    print(result)
    return result

def getBalance(data, accNo):
    df = pd.DataFrame(data[accNo])
    balance = df[(df["Balance Amount"] > 0) & (df["Sender Account Number"] == 0)]
    balance = df[df['Balance Amount'] > 0]
    balanceAmt = list(balance["Balance Amount"])
    transactionID = list(balance["Transaction ID"])
    result = convertDict(transactionID, balanceAmt)
    print(result)
    return result








app = Flask(__name__)
# CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.secret_key = 'any random string'

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
    accNo = getAccountNumbers(dfNull)
    print("session: ", 'data' in session.keys())
    if('data' in session.keys() == True):
        print("data : ", session['data'])
        dfFinal = getSepAccountData(dfNull, accNo, session['data'])
    else:
        dfFinal = getSepAccountData(dfNull, accNo, None)
    session['data'] = dfFinal
    session['AccNo'] = accNo
    print(session['data'])
    response =  jsonify("{'status':'success'}")
    return response

@app.route('/get-account-numbers', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True)
def get_account_number():
    accNo = session['AccNo']
    print(type(accNo))
    response = jsonify({"AccNo":accNo})
    return response

@app.route('/deposits-amount/<accNo>', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def deposits_amount(accNo):
    data = session['data']
    result = getDeposits(data, accNo)
    response = jsonify(result)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/withdrawals-amount/<accNo>', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def withdrawals_amount(accNo):
    data = session['data']
    result = getWithdrawals(data, accNo)
    response = jsonify(result)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/balance-amount/<accNo>', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def balance_amount(accNo):
    data = session['data']
    result = getBalance(data, accNo)
    response = jsonify(result)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/get-transactions/<accNo>', methods=['GET'])
@cross_origin(origins="*", supports_credentials=True,)
def get_transactions(accNo):
    data = session['data'][accNo]
    print(data)
    result = data
    response = jsonify(result)
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response


app.run(debug=True)