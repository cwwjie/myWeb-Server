const path = require('path');
const mongodb = require(path.relative(__dirname, './model/mongodb'));

const BaiduSchema = new mongodb.Schema({
    access_token: String,
    expires_timestamp: Number
}, { versionKey: false });

const Baidu = mongodb.connection.model('Baidu', BaiduSchema);

module.exports = Baidu;

// 必须先创建
// new Baidu({
//     access_token: "24.1a95d8b09450315ced8793bce7d1501a.2592000.1520338059.282335-10792466",
//     expires_timestamp: 2592000
// })
// .save()
// .then(
//     (val) => console.log(val),
//     (error) => console.log(error)
// )
