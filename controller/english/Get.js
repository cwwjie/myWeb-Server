const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const english = require('./model/english');

module.exports = async (ctx, next) => {
    ctx.body = await english.find({})
    .then(
        val => request.success(val), 
        error  => request.error(`查询失败，原因 ${error}`)
    );
}
