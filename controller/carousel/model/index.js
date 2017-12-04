const path = require('path');
const mongodb = require(path.relative(__dirname, './model/mongodb'));

let imgSchema = new mongodb.Schema({
    type: String,
    url: String
}, { versionKey: false });

let img = mongodb.connection.model('img', imgSchema);

module.exports = img;