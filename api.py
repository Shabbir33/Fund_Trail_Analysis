from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import csv
import codecs
import mysql.connector
from mysql.connector import Error
from pydantic import BaseModel

def array_to_json(element):
    obj = {}
    obj['datetime'] = element[0]
    obj['close'] = element[1]
    obj['high'] = element[2]
    obj['low'] = element[3]
    obj['open'] = element[4]
    obj['volume'] = element[5]
    obj['instrument'] = element[6]
    return obj

# def create_server_connection():
#     connection = None
#     try:
#         connection = mysql.connector.connect(
#             host='localhost',
#             user='root',
#             passwd='weakpassword123',
#             database='work'
#         )
#         print("MySQL Database connection successful")
#     except Error as err:
#         print(f"Error: '{err}'")

#     return connection

# def execute_query(connection, query):
#     cursor = connection.cursor()
#     try:
#         cursor.execute(query)
#         connection.commit()
#         return {"status":"RECORDS INSERTED SUCCESSFULLY"} 
#     except Error as err:
#         return {"status":"RECORDS INSERTION FAILED"}

# def read_query(connection, query):
#     cursor = connection.cursor()
#     result = None
#     try:
#         cursor.execute(query)
#         result = cursor.fetchall()
#         return result
#     except Error as err:
#         print(f"Error: '{err}'")

# conn = create_server_connection()

app = FastAPI()

# @app.get("/data")
# async def retreive():
#     query = "SELECT * FROM hindalco"
#     end = read_query(conn,query)
#     final = []
#     for i in end:
#         final.append(array_to_json(i))
#     json_data = jsonable_encoder({'alldata':final})
#     headers = {'Access-Control-Allow-Origin':'*'}
#     return JSONResponse(content=json_data, headers=headers)
    
@app.post("/upload")
def upload(file: UploadFile = File(...)):
    content = {}
    csvReader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))
    print(csvReader)
    for rows in csvReader:
        print(rows)
    file.file.close()
    headers = {'Access-Control-Allow-Origin':'*'}
    return JSONResponse(content=content, headers=headers)
    
