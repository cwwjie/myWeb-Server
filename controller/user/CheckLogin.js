const user = require('./model');

module.exports = async (ctx, next) => {
    let cookie = ctx.cookies.get('token') || '';

    if (!cookie) {
        ctx.body = {
            'result': 0,
            'data': null,
            'message': 'you token is null'
        };
        return
    } 

    let myQuery = new Promise((resolve, reject) => {
        user.findOne({ token: cookie }, (error, docs) => {
            if (error) {
                reject(error);
            }
            resolve(docs)
        });
    });

    let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 10000, "The query time is out");
    })

    await Promise.race([myQuery, timeout]).then((data) => {
        if (data === null) {
            ctx.body = {
                'result': 0,
                'data': null,
                'message': 'The query does not have this account'
            };
            return
        }

        ctx.body = {
            'result': 1,
            'data': null,
            'message': 'Success'
        };
    }, function (error) {
        ctx.body = {
            'result': 0,
            'data': null,
            'message': 'Database query error, The reason code is: ' + error
        };
    });
};
