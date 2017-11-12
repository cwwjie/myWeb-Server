# coding: utf8
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import config.mysql
import json
import pymysql # MySQLdb只支持Python2.*，还不支持3.*

pymysql.install_as_MySQLdb() # 就可以用 import MySQLdb了。其他的方法与MySQLdb一样

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True # 去除版本警告
app.config['SQLALCHEMY_NATIVE_UNICODE'] = True # 去除版本警告
app.config['SQLALCHEMY_DATABASE_URI'] = config.mysql.SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app, use_native_unicode='utf8')

class Todo(db.Model): # 必须继承 Model 类。 Model 是 继承Query类
    """ 创建一个 todo 表
    """
    __tablename__ = 'todo_item' # 指定表名 可省
    item_id = db.Column(db.Integer, primary_key = True) # 指定 表字段
    item_description = db.Column(db.Text, unique = True, nullable = False)
    item_category = db.Column(db.String(20), unique = True, nullable = False)
    item_priority = db.Column(db.Integer, unique = True, nullable = False)
    item_create_date = db.Column(db.String(13), unique = True, nullable = False)

    def __init__(self, item_description, item_category, item_priority, item_create_date):
        self.item_description = description
        self.item_category = item_category
        self.item_priority = item_priority
        self.item_create_date = item_create_date


@app.route('/', methods=['GET'])
def hello_world():
    myitem = Todo.query.filter_by(item_category=u'未分类').first()
    print(myitem.item_description)
    return jsonify({
        'a': 1,
        'b': 2,
        'c': [3, 4, 5]
    })

if __name__ == '__main__':
    app.run()
