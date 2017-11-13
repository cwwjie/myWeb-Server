#encoding=utf-8
import MySQLdb

myConnect = MySQLdb.connect(host='localhost', user='Rejiejay', passwd='QQ1938167', db='todo', port=3306, charset='utf8')

myCursor = myConnect.cursor()

myCursor.execute('select * from todo_item')
rows = myCursor.fetchall()

myCursor.close()
myConnect.close()

print(rows)









