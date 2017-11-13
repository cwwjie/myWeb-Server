# coding: utf8

dialect = 'mysql'
username = 'Rejiejay'
password = 'QQ1938167'
host = '127.0.0.1'
port = '3306'
database = 'todo'

SQLALCHEMY_DATABASE_URI = "{}://{}:{}@{}:{}/{}?charset=utf8".format(dialect, username, password, host, port, database)

