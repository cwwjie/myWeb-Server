const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const english = require('./model/english');

module.exports = async (ctx, next) => {
    let inspectRequestBody = inspect(ctx.request.body);
    if (inspectRequestBody.result !== 1) {
        return ctx.body = inspectRequestBody;
    }

    let creatNewEnglishWorld = new english({
		value: ctx.request.body.value,
		translate: ctx.request.body.translate,
		page: ctx.request.body.page
    });

    
    ctx.body = await creatNewEnglishWorld.save()
    .then(
        val => request.success(val), 
        error  => request.error(`新增失败，原因 ${error}`)
    );
}

let inspect = (body) => {
    if (
        body.value &&
        body.translate &&
        body.page
    ) {
        if (
            typeof body.value === 'string' &&
            typeof body.translate === 'string' &&
            typeof body.page === 'number'
        ) {
            return request.success();
        } else {
            return request.error('数据未缺失，但是格式有误！');
        }
    } else {
        return request.error('数据有缺失！');
    }
}
