const dynamic = require('./model');
const queryCookie = require('./method/queryCookie');

module.exports = async (ctx, next) => {
	let cookie = ctx.cookies.get('token') || '',
		postData = ctx.request.body;
		// {
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

	let date = Date.parse(new Date()),
		title = postData.title || '',
		content = postData.content;

	let DynamicData = new dynamic({
		date: date,
		title: title,
		content: content,
		thoughtsCount: 0,
		upvote: 0
	});

  let mySave = new Promise((resolve, reject) => {
		DynamicData.save((error, docs) => {
			if (error) {
				reject(error);
			} else {
				resolve(docs);
			}
		});
  });

	let timeout = new Promise((resolve, reject) => {
		setTimeout(reject, 10000, 'Save to the database time is out');
	})

	await Promise.race([mySave, timeout]).then((data) => {
		ctx.body = {
			'result': 1,
			'data': null,
			'message': 'Save to Database success'
		};
	}, function (error) {
		ctx.body = {
			'result': 0,
			'data': null,
			'message': 'Save to Database error, The reason code is: ' + error
		};
	});
};


let inspect = (data) => {
	let inspectTarget = data.content || '';

	if (!inspectTarget) {
		return false
	}

	if (typeof inspectTarget === 'string') {
		return true
	} else {
		return false
	}
}


