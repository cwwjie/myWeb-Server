const dynamic = require('./model');
const lodash = require('lodash');

module.exports = async (ctx, next) => {
	let myQuery = new Promise((resolve, reject) => {
        dynamic.find({}, (error, docs) => {
            if (error) {
                reject(error);
            }
            resolve(docs)
        });
    });

	let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 10000, "The query time is out");
    });

    await Promise.race([myQuery, timeout]).then((data) => {
		
		if (data.length === 0) {
            ctx.body = {
                'result': 0,
                'data': [],
                'message': 'Database query success, But database is empty'
            };
        } else {
			let sortList = lodash.take(lodash.shuffle(data), 100);

			ctx.body = {
				'result': 1,
				'data': sortList,
				'message': 'Database is query success'
			};
		}


	});
}
