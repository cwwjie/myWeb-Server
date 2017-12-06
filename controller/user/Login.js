const path = require('path');
const CreateNonce = require(path.relative(__dirname, './method/CreateNonce'));
const user = require('./model');

module.exports = async (ctx, next) => {
    let postData = ctx.request.body;
    // data: {
    //     account: 'account'
    //     password: 'password'
    // }

	if (ctx.is('application/json') === false) {
		ctx.body = { 'result': 0, 'data': null, 'message': 'you post method is mistaken' };
		return
	}

    if (inspect(postData) === false) {
		ctx.body = { 'result': 0, 'data': null, 'message': 'you post data form is mistaken' };
		return
	}
    
    let newToken = CreateNonce();

    let myQuery = new Promise((resolve, reject) => {
        user.findOneAndUpdate({
            'account': postData.account,
            'password': postData.password
        }, {
			$set : {
				'date': Date.parse(new Date()),
				'token': newToken
			}
		},  (error, docs) => {
            if (error) {
                reject(error);
            }
            resolve(docs)
        });
    });

    await Promise.race([myQuery, new Promise((resolve, reject) => {
        setTimeout(reject, 10000, "The query time is out");
    })]).then((data) => {
        if (data === null) {
            ctx.body = {
                'result': 2,
                'data': null,
                'message': 'The database query show that you account or password is mistake'
            };
            return
        }

        ctx.body = {
            'result': 1,
            'data': newToken,
            'message': 'Success'
        };
    }, function (error) {
        ctx.body = {
            'result': 0,
            'data': null,
            'message': 'The database query is error, The reason code is: ' + error
        };
    });
};


const inspect = (data) => {
	let inspectAccount = data.account || '',
        inspectPassword = data.password || '';

	if (!inspectAccount || !inspectPassword) {
		return false
	}

	if (typeof inspectAccount === 'string' && typeof inspectPassword === 'string' ) {
		return true
	} else {
		return false
	}
}
