from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True # 去除版本警告
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://Rejiejay:QQ1938167@localhost:3306/todo'
db = SQLAlchemy(app)

class Todo(db.Model): # 必须继承 Model 类。 Model 是 继承Query类
    """ 创建一个 todo 表
    """
    __tablename__ = 'todoitem' # 指定表名 可省
    id = db.Column(db.Integer, primary_key = True) # 指定 表字段
    description = db.Column(db.Text, unique = True, nullable = False)
    category = db.Column(db.String(20), unique = True, nullable = False)
    priority = db.Column(db.Integer, unique = True, nullable = False)
    createDate = db.Column(db.String(13), unique = True, nullable = False)

    def __init__(self, description, category, priority, createDate):
        self.description = description
        self.category = category
        self.priority = priority
        self.createDate = createDate


@app.route('/', methods=['GET'])
def hello_world():
    return jsonify({
        'a': 1,
        'b': 2,
        'c': [3, 4, 5]
    })

if __name__ == '__main__':
    app.run()
