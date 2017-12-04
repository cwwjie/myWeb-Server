const path = require('path');
const mongodb = require(path.relative(__dirname, './model/mongodb'));

let dynamic = new mongodb.Schema({
    date: Number,
    title: String,
    content: String,
    thoughtsCount: Number,
    upvote: Number,
}, { versionKey: false });

module.exports = mongodb.connection.model('dynamic', dynamic);
