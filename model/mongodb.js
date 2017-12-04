const path = require('path');
const config = require(path.relative(__dirname, './config/'));

let mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = {
    Schema: mongoose.Schema,
    connection: mongoose.createConnection(config.mongodbURL +　config.database)
}
