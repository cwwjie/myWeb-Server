from flask import Flask, request, jsonify
import json

app = Flask(__name__)
@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/json', methods=['GET'])
def json():
    return jsonify({
        'a': 1,
        'b': 2,
        'c': [3, 4, 5]
    })

if __name__ == '__main__':
    app.run()