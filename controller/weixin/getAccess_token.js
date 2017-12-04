const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const getjsonby = require('./method/getjsonby');
const AccessToken = require('./model/AccessToken');

/**
 * 如果数据库 存在 access_token, 并且 expires_timestamp 未过期. 返回 access_token.
 * 如果数据库 不存在 access_token, 或 expires_timestamp 过期. 获取微信 access_token 并且返回.
 */
module.exports = async () => {
    let expiresAccessToken,
        nowTimestamp = Date.parse(new Date());

    // 数据库查询 access_token
    let findAccess_token = await AccessToken.findOne({
        access_token: {
            $exists: true
        }
    }).then(
        (val) => {
            if (val) {
                if (nowTimestamp > val.expires_timestamp) {
                    expiresAccessToken = val;
                    return request.error('Data query is successful, But it has expired', 4);
                }
                return request.success(val);
            }

            return request.error('Data query is successful, But database is empty', 3);
        },
        (error) => request.error(`Request database error, The reason is ${error}`, 2)
    );

    // 如果数据库 存在 access_token, 并且 expires_timestamp 未过期. 返回 access_token.
    // 如果数据库 查询发生错误, 仍然返回 错误信息
    if (findAccess_token.result === 1 || findAccess_token.result === 2) {
        return findAccess_token
    }

    // 如果数据库 不存在 access_token, 或 expires_timestamp 过期. 查询远程服务器 access_token
    let access_token = {
            // "access_token": "ACCESS_TOKEN",
            // "expires_in": 7200
        },
        grant_type = 'client_credential',
        appID = 'wx34ce4f0ce6eadb39',
        appsecret = '317b46c976749223abf57213fce07b0f';

    let getAccess_token = await getjsonby(`https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appID}&secret=${appsecret}`)
    .then((val) => {
        if (val.errcode) {
            let errorMessage = ({
                '-1': '系统繁忙，此时请开发者稍候再试',
                '40001': 'AppSecret错误或者AppSecret不属于这个公众号，请开发者确认AppSecret的正确性',
                '40002': '请确保grant_type字段值为client_credential',
                '40164': '调用接口的IP地址不在白名单中，请在接口IP白名单中进行设置'
            })[val.errcode];

            return request.error(`请求 access_token 数据返回错误, 原因: ${errorMessage}. The access_token result is error, Because ${val.errmsg}.`)
        }

        access_token = val;
        return request.success(access_token);
    }, (error) => request.error(error));

    // 查询远程服务器成功, 储存到数据库 并且返回
    if (getAccess_token.result === 1) {
        const expires_timestamp = getAccess_token.expires_in * 1000 + nowTimestamp;
        const wechat_access_token = {
            'access_token': expires_timestamp.access_token,
            'expires_timestamp': expires_timestamp
        };

        // 储存到数据库
        let saveAccessToken;
        if (findAccess_token.result === 2) {
            saveAccessToken = await new AccessToken(wechat_access_token)
            .save()
            .then(
                (val) => request.success(val),
                (error) => request.success(error)
            )
        } else {
            saveAccessToken = await AccessToken.findOneAndUpdate(expiresAccessToken, {
                $set : wechat_access_token
            }).then(
                (val) => request.success(val),
                (error) => request.success(error)
            )
        }

        // 返回结果
        if (saveAccessToken.result === 1) {
            return request.success(wechat_access_token);
        } else {
            return request.error(`find access_token in weixin.qq.com is successful, but access_token storage error occurred. The reason is ${saveAccessToken.message}`);
        }
    } else {
        return getAccess_token
    }

}
