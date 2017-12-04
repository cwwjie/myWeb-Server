const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const model = require('./model');

module.exports = async (ctx, next) => {
	let cookie = ctx.cookies.get('token') || '',
		postData = ctx.request.body;

    if (ctx.is('application/json') === false) {
		return ctx.body = request.error('The Request method is mistaken')
	}
	if (inspect(postData) === false) {
		return ctx.body = request.error('The Data Format is mistaken')
    }

    ctx.body = await model.Todo.create({
        'description': postData.description,
        'category': postData.category || '无分类',
        'priority': postData.priority || 0,
        'isComplete': 0,
        'createTime': Date.parse(new Date()),
    }).then(
        data => request.success(),
        error => request.error(`Save to Database error, The reason code is: ${error}`)
    );
};

let inspect = (data) => {
    let description = data.description || false,
        category = data.category || false,
        priority = data.priority;

    if (!description || typeof description !== 'string') { return false }

    if (category) {
        if (typeof category !== 'string') { return false }
    }

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

