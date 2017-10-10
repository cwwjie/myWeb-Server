const user = require('./../../user/model');

module.exports = async (token) => {
    let success = false,
        message = '';

    if (!token || token.length !== 62) {
        return {
            'success': false,
            'message': 'you token is mistake'
        }
    }

    let myQuery = new Promise((resolve, reject) => {
        user.findOne({ token: token }, (error, docs) => {
            if (error) {
                reject(error);
            }
            resolve(docs);
        });
    });

    await Promise.race([
        myQuery,
        new Promise((resolve, reject) => { setTimeout(reject, 10000, "Check The Cookie time is out") })
    ]).then((data) => {
        if (data === null) {
            message = 'The database query show that you token is mistake';
            return
        }

        let tokenTime = data.date || 0,
        expired = 86400000,
        nowData = Date.parse(new Date());

        // 现在的时间 应小于 创建 token 一天(expired)后时间, 否则 token 是过期的.
        if ( nowData > (tokenTime + expired)) {
            message = 'you token is expired';
            return
        }

        success = true;
        message = 'Success';
    }, function (error) {
        message = `The database query error, The reason code is: ${error}`;
    });

    return {
        'success': success,
        'message': message
    }
}

