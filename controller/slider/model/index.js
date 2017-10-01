const path = require('path');
const config = require(path.relative(__dirname, './config/'));

let mongoose = require('mongoose');

mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let connection = mongoose.createConnection(config.mongodbURL +　config.database);

let imgSchema = new Schema({
    type: String,
    url: String
}, { versionKey: false });

let img = connection.model('img', imgSchema);

module.exports = img;