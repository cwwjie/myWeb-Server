const path = require('path');
const mongodb = require(path.relative(__dirname, './model/mongodb'));

const carouselSchema = new mongodb.Schema({
    type: String,
    url: String
}, { versionKey: false });

module.exports = mongodb.connection.model('carousel', carouselSchema);
