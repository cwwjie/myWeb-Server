const getMongoData = require('./getMongoData');
const insertMySQLdata = require('./insertMySQLdata');

const MongoDBtoMySQL = async () => {
  let myMongoData;

  await getMongoData()
  .then((data) => {
    console.log("查询 MongoDB 数据库成功");
    myMongoData = data;
  }, (error) => { throw error })

  await insertMySQLdata(myMongoData)
  .then(() => {
    console.log("MySQL数据库 数据插入成功");
  }, (error) => { throw error })
};



MongoDBtoMySQL();

