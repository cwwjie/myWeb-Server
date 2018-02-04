const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const getjsonby = require(path.relative(__dirname, './method/getjsonbyhttps'));
const WeChat = require('./../model/WeChat');

/**
 * 获取access_token接口 /token
 * 如果数据库 存在 access_token, 并且 expires_timestamp 未过期. 返回 access_token.
 * 如果数据库 不存在 access_token, 或 expires_timestamp 过期. 获取微信 access_token 并且返回.
 */
module.exports = async () => {
    let expiresAccessToken;

    // 数据库查询 access_token
    let findAccess_token = await WeChatFindOne();

    // 如果数据库 存在 access_token, 并且 expires_timestamp 未过期. 返回 access_token.
    // 如果数据库 查询发生错误, 仍然返回 错误信息
    if (findAccess_token.result === 1 || findAccess_token.result === 400) {
        return findAccess_token
    } else if (findAccess_token.result === 4) { // 表示过期
        expiresAccessToken = findAccess_token.data;
    }

    // 如果数据库 不存在 access_token, 或 expires_timestamp 过期. 查询远程服务器 access_token
    let grant_type = 'client_credential',
        appID = 'wx34ce4f0ce6eadb39',
        appsecret = '317b46c976749223abf57213fce07b0f';

    let getAccess_token = await getWeixinCredential(grant_type, appID, appsecret);

    // 查询远程服务器成功, 储存到数据库 并且返回
    if (getAccess_token.result === 1) {
        const wechat_access_token = {
            'access_token': getAccess_token.data.access_token,
            'expires_timestamp': getAccess_token.data.expires_in * 1000 + Date.parse(new Date())
        };

        // 储存到数据库
        let saveAccessToken;
        if (findAccess_token.result === 4) { // 过期
            saveAccessToken = await WeChatUpdate(expiresAccessToken._id, wechat_access_token);
        } else {
            saveAccessToken = await WeChatSave(wechat_access_token);
        }

        // 存储成功 返回结果
        if (saveAccessToken.result === 1) {
            return request.success(wechat_access_token, 'get access_token successful and access_token storage in database');
        } else {
            return saveAccessToken;
        }
    } else {
        return getAccess_token
    }
}


let WeChatUpdate = (id, wechat_access_token) => WeChat.findOneAndUpdate({
        '_id': id
    }, {
        '$set': {
            'access_token': wechat_access_token.access_token,
            'expires_timestamp': wechat_access_token.expires_timestamp
        }
    }).then(
        (val) => request.success(val, 'get access_token successful and access_token update in database'),
        (error) => request.error(`get access_token successful, but can not update database. Because ${error}`, 400)
    )


let WeChatSave = (wechat_access_token) => new WeChat(wechat_access_token)
    .save()
    .then(
        (val) => request.success(val, 'get access_token successful and access_token storage in database'),
        (error) => request.error(`get access_token successful, but can not storage. Because ${error}`, 400)
    )


let getWeixinCredential = (grant_type, appID, appsecret) => getjsonby(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appID}&secret=${appsecret}`
    ).then((val) => {
        // val = {
        //     "access_token": "ACCESS_TOKEN",
        //     "expires_in": 7200
        // }
        if (val.errcode) {
            let errorMessage = ({
                '-1': '系统繁忙，此时请开发者稍候再试',
                '40001': 'AppSecret错误或者AppSecret不属于这个公众号，请开发者确认AppSecret的正确性',
                '40002': '请确保grant_type字段值为client_credential',
                '40164': '调用接口的IP地址不在白名单中，请在接口IP白名单中进行设置'
            })[val.errcode];

            return request.error(`请求 access_token 数据返回错误, 原因: ${errorMessage}. The access_token result is error, Because ${val.errmsg}.`)
        }

        return request.success(val, 'get access_token successful');
    }, (error) => request.error(`${error}`, 400));


let WeChatFindOne = () => WeChat.findOne({
        'access_token': {
            '$exists': true
        }
    }).then(
        (val) => {
            if (val) {
                let nowTimestamp = Date.parse(new Date());

                if (nowTimestamp > val.expires_timestamp) {
                    return request.error('find access_token successful, But it has expired', 4, val);
                }
                return request.success(val, 'find access_token successful');
            }
            
            return request.error('Data query is successful, But database is empty', 3);
        },
        (error) => request.error(`Request database error, The reason is ${error}`, 400)
    );
