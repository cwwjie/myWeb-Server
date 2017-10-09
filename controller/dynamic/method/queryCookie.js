const user = require('./../../user/model');

module.exports = async (token) => {
    let success = false,
        message = '';
	
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
            message = 'Can not have query this account';
            return
        }
        success = true;
        message = 'Success';
    }, function (error) {
        message = `Database query error, The reason code is: ${error}`;
    });

    return {
        'success': success,
        'message': message
    }
}

