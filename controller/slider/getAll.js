const Img = require('./model');

module.exports = async (ctx, next) => {
    let myQurty = new Promise((resolve, reject) => {
        Img.find({ type: 'imgUrl' }, (error, docs) => {
            if (error) {
                reject(error);
            }
            resolve(docs)
        });
    });
    let timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 10000, "The qurty time is out");
    })

    await Promise.race([myQurty, timeout]).then((data) => {
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
