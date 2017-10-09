const dynamic = require('./model');
const queryCookie = require('./method/queryCookie');

module.exports = async (ctx, next) => {
	let cookie = ctx.cookies.get('token') || '',
		postData = ctx.request.body;
	// {
	// 	id: '59d2e5dbf8ec5014ecfa4f1e',
	// 	title: '标题', // 非必填
	// 	content: '内容',
	// }

	if (ctx.is('application/json') === false) {
		ctx.body = {
			'result': 0,
			'data': null,
			'message': 'you post method is mistaken'
		};
		return
	}

	if (inspect(postData) === false) {
		ctx.body = {
			'result': 0,
			'data': null,
			'message': 'you post data form is mistaken'
		};
		return
	}
	
	if (!cookie) {
		ctx.body = {
			'result': 0,
			'data': null,
			'message': 'you token is null'
		};
		return
	}

	let checkCookie = await queryCookie(cookie);
	
	if (checkCookie.success === false) {
		ctx.body = {
			'result': 0,
			'data': null,
			'message': checkCookie.message
		};
		return
	}

    let myUpdate = new Promise((resolve, reject) => {
		dynamic.updateOne({
			_id: postData.id
		}, {
			$set : {
				title: postData.title || '',
				content: postData.content
			}
		}, (error, docs) => {
			if (error) {
				reject(error);
			} else {
				resolve(docs);
			}
		});
    });

	let timeout = new Promise((resolve, reject) => {
		setTimeout(reject, 10000, 'Update to the database time is out');
	})

	await Promise.race([myUpdate, timeout]).then((data) => {
		ctx.body = {
			'result': 1,
			'data': null,
			'message': 'Update to Database success'
		};
	}, function (error) {
		ctx.body = {
			'result': 0,
			'data': null,
			'message': 'Update to Database error, The reason code is: ' + error
		};
	});
};


let inspect = (data) => {
	let inspectId = data.id || '',
		inspectContent = data.content || '';


	if (!inspectId) { return false }
	
	if (!inspectContent) { return false }

	if (typeof inspectId === 'string' && typeof inspectContent === 'string') {
		return true
	} else {
		return false
	}
}
