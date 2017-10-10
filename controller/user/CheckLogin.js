const user = require('./model');

module.exports = async (ctx, next) => {
    let cookie = ctx.cookies.get('token') || '';

    if (!cookie || cookie.length !== 62) {
        ctx.body = {
            'result': 0,
            'data': null,
            'message': 'you token is mistake'
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

    await Promise.race([myQuery, new Promise((resolve, reject) => {
        setTimeout(reject, 10000, "The query time is out");
    })]).then((data) => {
        if (data === null) {
            ctx.body = {
                'result': 0,
                'data': null,
                'message': 'The database query show that you token is mistake'
            };
            return
        }

        let tokenTime = data.date || 0,
            expired = 86400000,
            nowData = Date.parse(new Date());

        // 现在的时间 应小于 创建 token 一天(expired)后时间, 否则 token 是过期的.
        if ( nowData > (tokenTime + expired)) {
            ctx.body = {
                'result': 0,
                'data': null,
                'message': 'you token is expired'
            };
            return
        }

        ctx.body = {
            'result': 1,
            'data': data,
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
