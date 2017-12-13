const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const model = require('./model');

module.exports = async (ctx, next) => {
	let postData = ctx.request.body;

    if (ctx.is('application/json') === false) {
		return ctx.body = request.error('The Request method is mistaken')
	}
	if (inspect(postData) === false) {
		return ctx.body = request.error('The Data Format is mistaken')
    }

    let findOneData = await model.Todo.findOne({
        'where': {'id': postData.id}
    }).then(
        data => request.success(data),
        error => request.error(`findOne in Database error, The reason code is: ${error}`)
    );

    if (findOneData.result === 1) {
        ctx.body = await model.Todo.update({
            'isComplete': postData.isComplete === undefined ? findOneData.data.isComplete : postData.isComplete,
            'description': postData.description || findOneData.data.description,
            'category': postData.category || findOneData.data.category,
            'priority': postData.priority === undefined ? findOneData.data.priority : postData.priority
        }, {
            'where': { 'id': postData.id }
        }).then(
            data => request.success(),
            error => request.error(`update to Database have error, The reason code is: ${error}`)
        );
    } else {
        ctx.body = findOneData
    }
};

let inspect = (data) => {
    let id = data.id || false,
        isComplete = data.isComplete,
        description = data.description || false,
        category = data.category || false,
        priority = data.priority;
    
    // id 为必填 
    if (!id || typeof id !== 'number')  { return false }

    // isComplete 为 0 或者 1 非必填
    if (isComplete !== undefined) {
        if ( isComplete !== 0 && isComplete !== 1) { return false }
    }

    // description 任务描述 非必填
    if (description) {
        if (typeof description !== 'string') { return false }
    }

    // category 任务分类 非必填
    if (category) {
        if (typeof category !== 'string') { return false }
    }

    // priority 优先程度 非必填
    if (priority !== undefined) {
        if (
            priority !== 0 &&
            priority !== 1 &&
            priority !== 2 &&
            priority !== 3 &&
            priority !== 4
        ) {
            return false
        }
    }

    return true
}

