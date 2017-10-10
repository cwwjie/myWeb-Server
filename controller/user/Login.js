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
    
    let newToken = createRandomNum();

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

const createRandomNum = () => {
	const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	return chars.map(() => (chars[Math.ceil(Math.random() * 61)])).join('');
}
