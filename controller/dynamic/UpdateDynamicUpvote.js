const dynamic = require('./model');

module.exports = async (ctx, next) => {
	let postData = ctx.request.body;
	// {
	// 	id: '59d2e5dbf8ec5014ecfa4f1e'
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

	let myUpvote;
	await findUpvoteById(postData.id)
		.then((data) => {
			myUpvote = data.upvote;
		}, function (error) {
			ctx.body = {
				'result': 0,
				'data': null,
				'message': `Database query upvote by id is failure, The reason is: ${error}`
			};
			myUpvote = false;
		});

	if (myUpvote === false) { return }

	myUpvote++

	let myUpdate = new Promise((resolve, reject) => {
		dynamic.updateOne({
			_id: postData.id
		}, {
			$set : {
				upvote: myUpvote
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
		setTimeout(reject, 10000, 'Update upvote to the database time is out');
	})

	await Promise.race([myUpdate, timeout]).then((data) => {
		ctx.body = {
			'result': 1,
			'data': null,
			'message': 'Update upvote to Database success'
		};
	}, function (error) {
		ctx.body = {
			'result': 0,
			'data': null,
			'message': 'Update upvote to Database error, The reason code is: ' + error
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

let findUpvoteById = async (id) => {
    let myQuery = new Promise((resolve, reject) => {
        dynamic.findOne({_id: id}, (error, docs) => {
            if (error) {
                reject(error);
            }
            resolve(docs);
        });
    });

	let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 10000, "The query time is out");
    });

    return Promise.race([myQuery, timeout])
}
