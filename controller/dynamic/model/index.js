const path = require('path');
const mongoose = require('mongoose');

const config = require(path.relative(__dirname, './config/'));

let Schema = mongoose.Schema;
let connection = mongoose.createConnection(config.mongodbURL +　config.database);

let dynamic = new Schema({
    date: String,
    title: String,
    content: String,
    thoughtsCount: Number,
    upvote: Number,
}, { versionKey: false });

module.exports = connection.model('dynamic', dynamic);
