const path = require('path');
const mongodb = require(path.relative(__dirname, './model/mongodb'));

let userSchema = new mongodb.Schema({
    date: Number,
    token: String,
    account: String,
    password: String
}, { versionKey: false });

let user = mongodb.connection.model('user', userSchema);

module.exports = user;
