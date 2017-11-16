const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://mywebRejiejay:lsPTpHyoLrUR4eWf@119.29.140.46:19381,119.29.140.46:19382,119.29.140.46:19383/myweb?replicaSet=VM_253_28_centos';

module.exports = () => (new Promise((resolve, reject) => {
  // Use connect method to connect to the server
  MongoClient.connect(url, (error, db) => {
    if (error) {
      db.close();
      reject(error);
    }
    console.log("连接 MongoDB 数据库成功");

    // Get the documents collection
    const collection = db.collection('dynamics');
    // Find some documents
    collection.find({}).toArray((error, docs) => {
      if (error) {
        db.close();
        reject(error);
      }
      
      resolve(docs)
      db.close();
    });
  });
}));
