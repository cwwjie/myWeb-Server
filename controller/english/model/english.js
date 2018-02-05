const path = require('path');
const mongodb = require(path.relative(__dirname, './model/mongodb'));

const EnglishSchema = new mongodb.Schema({
    value: String,
    translate: String,
    page: Number
}, { versionKey: false });

const English = mongodb.connection.model('English', EnglishSchema);

module.exports = English;

// 必须先创建
// new English({
//     access_token: "24.1a95d8b09450315ced8793bce7d1501a.2592000.1520338059.282335-10792466",
//     expires_timestamp: 2592000
// })
// .save()
// .then(
//     (val) => console.log(val),
//     (error) => console.log(error)
// )
