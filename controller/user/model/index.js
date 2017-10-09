const path = require('path');
const config = require(path.relative(__dirname, './config/'));

let mongoose = require('mongoose');

mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let connection = mongoose.createConnection(config.mongodbURL +　config.database);

let userSchema = new Schema({
    date: Number,
    token: String,
    account: String,
    password: String
}, { versionKey: false });

let user = connection.model('user', userSchema);

module.exports = user;