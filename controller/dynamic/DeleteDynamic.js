const dynamic = require('./model');

module.exports = async (ctx, next) => {
	let postData = ctx.request.body;
	// {
	// 	id: '59d2e5dbf8ec5014ecfa4f1e',
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

	let myDelete = new Promise((resolve, reject) => {
		dynamic.deleteOne({_id: postData.id}, (error, docs) => {
			if (error) {
				reject(error);
			}
			resolve(docs)
		});
	});

	let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 10000, "The query time is out");
    });

	await Promise.race([myDelete, timeout]).then((data) => {
		ctx.body = {
			'result': 1,
			'data': null,
			'message': 'Delete to Database success'
		};
	}, function (error) {
		ctx.body = {
			'result': 0,
			'data': null,
			'message': 'Delete to Database error, The reason code is: ' + error
		};
	});

};



let inspect = (data) => {
	let inspectTarget = data.id || '';

	if (!inspectTarget) {
		return false
	}

	if (typeof inspectTarget === 'string') {
		return true
	} else {
		return false
	}
}
