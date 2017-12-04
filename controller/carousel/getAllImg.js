const carousel = require('./model');

module.exports = async (ctx, next) => {
    let myQuery = new Promise((resolve, reject) => {
        carousel.find({ type: 'imgUrl' }, (error, docs) => {
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
        if (data.length === 0) {
            ctx.body = {
                'result': 0,
                'data': [],
                'message': 'Database query success, But database is empty'
            };
            return
        }

        let myDataList = data.map(function (val) {
            return val.url;
        });
        ctx.body = {
            'result': 1,
            'data': myDataList,
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
