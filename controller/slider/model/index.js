const path = require('path');
const config = require(path.relative(__dirname, './config/'));

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let connection = mongoose.createConnection(config.mongodb +　'test');

let imgSchema = new Schema({
    type: String,
    url: String
});

let Img = connection.model('Img', imgSchema);

module.exports = Img;