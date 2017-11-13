# coding: utf8
from flask import Flask, request, jsonify
import MySQLdb
import json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def getAll():
    myConnect = MySQLdb.connect(host='localhost', user='Rejiejay', passwd='QQ1938167', db='todo', port=3306, charset='utf8')

    myCursor = myConnect.cursor()
    myCursor.execute('select * from todo_item')

    myresults = myCursor.fetchall()

    myCursor.close()
    myConnect.close()

    print(myresults)
    if (myresults == None):
        return jsonify({
            'a': 'null'
        })


    return jsonify({
        'a': 1,
        'b': 2,
        'c': [3, 4, 5]
    })

if __name__ == '__main__':
    app.run()
