const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const english = require('./model/english');

module.exports = async (ctx, next) => {
    if (!ctx.request.body.value || typeof ctx.request.body.value !== 'string') {
        return ctx.body = request.error('数据格式有误！');
    }

    ctx.body = await english.deleteOne({
        'value': ctx.request.body.value
    })
    .then(
        val => request.success({}, `删除元素 ${ctx.request.body.value} 成功`), 
        error  => request.error(`删除失败，原因 ${error}`)
    );
}
