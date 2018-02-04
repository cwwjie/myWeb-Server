const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const Baidu = require('./model/Baidu');
const getjsonbyhttps = require(path.relative(__dirname, './method/getjsonbyhttps'));

module.exports = async (ctx, next) => {
    // 数据库查询 access_token
    let findAccess_token = await BaiduFindOne();

    // 如果数据库 存在 access_token, 并且 expires_timestamp 未过期. 返回 access_token.
    // 如果数据库 查询发生错误, 仍然返回 错误信息
    if (findAccess_token.result === 1 || findAccess_token.result === 400) {
        return ctx.body =  findAccess_token;
    }

    let getAccess_token = await getBaiduCredential('27SGol94OgTq3mE3RiAk0od7', 'IzdrDWlkobd5j32WESEwlkiPut0RTYMo');
    if (getAccess_token.result === 1) {
        const baidu_access_token = {
            'access_token': getAccess_token.data.access_token,
            'expires_timestamp': getAccess_token.data.expires_in * 1000 + Date.parse(new Date())
        };

        // 储存到数据库
        let saveAccessToken = await BaiduSave(baidu_access_token);

        // 存储成功 返回结果
        if (saveAccessToken.result === 1) {
            return ctx.body = request.success(baidu_access_token, 'get access_token successful and access_token storage in database');
        } else {
            return ctx.body = saveAccessToken;
        }
    } else {
        return ctx.body =  getAccess_token;
    }
}

let BaiduSave = (baidu_access_token) => Baidu.findOneAndUpdate({
    'access_token': {
        '$exists': true
    }
}, {
    '$set': {
        'access_token': baidu_access_token.access_token,
        'expires_timestamp': baidu_access_token.expires_timestamp
    }
}).then(
    val => request.success(val, 'get access_token successful and access_token storage in database'),
    error => request.error(`get access_token successful, but can not storage. Because ${error}`, 400)
)

let getBaiduCredential = (client_id, client_secret) => getjsonbyhttps(
    `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
).then(val => {
    // val = {
    //     'access_token': '24.1a95d8b09450315ced8793bce7d1501a.2592000.1520338059.282335-10792466',
    //     'session_key': '9mzdCuU6PZyPi+3qOWUtGDCcw8QuSuGG7+CZqlBstDahHqri0CZlu1Qo2oJUNcqTcXxW5x8HNsY0WAMi0OqQbp72bzfKgA==',
    //     'scope': 'public brain_all_scope audio_voice_assistant_get audio_tts_post wise_adapt lebo_resource_base lightservice_public hetu_basic lightcms_map_poi kaidian_kaidian ApsMisTest_Test\u6743\u9650 vis-classify_flower bnstest_fasf lpq_\u5f00\u653e cop_helloScope ApsMis_fangdi_permission',
    //     'refresh_token': '25.ce346e3945bed01cad36f69bf731aeae.315360000.1833106059.282335-10792466',
    //     'session_secret': '36a3eb566919a9c9f800e20e2f0b1fe9',
    //     'expires_in': 2592000
    // }
    if (val.error) {
        let errorMessage = ({
            'invalid_request': '请求缺少某个必需参数，包含一个不支持的参数或参数值，或者格式不正确。',
            'invalid_client': 'client_id”、“client_secret”参数无效。',
            'invalid_grant': '提供的Access Grant是无效的、过期的或已撤销的，例如，Authorization Code无效(一个授权码只能使用一次)、Refresh Token无效、redirect_uri与获取Authorization Code时提供的不一致、Devie Code无效(一个设备授权码只能使用一次)等。',
            'unauthorized_client': '应用没有被授权，无法使用所指定的grant_type。',
            'unsupported_grant_type': '“grant_type”百度OAuth2.0服务不支持该参数。',
            'invalid_scope': '请求的“scope”参数是无效的、未知的、格式不正确的、或所请求的权限范围超过了数据拥有者所授予的权限范围。',
            'expired_token': '提供的Refresh Token已过期',
            'redirect_uri_mismatch': '“redirect_uri”所在的根域与开发者注册应用时所填写的根域名不匹配。',
            'unsupported_response_type': '“response_type”参数值不为百度OAuth2.0服务所支持，或者应用已经主动禁用了对应的授权模式',
            'slow_down': 'Device Flow中，设备通过Device Code换取Access Token的接口过于频繁，两次尝试的间隔应大于5秒。',
            'authorization_pending': 'Device Flow中，用户还没有对Device Code完成授权操作。',
            'authorization_declined': 'Device Flow中，用户拒绝了对Device Code的授权操作。',
            'invalid_referer': '	Implicit Grant模式中，浏览器请求的Referer与根域名绑定不匹配'
        })[val.error];

        return request.error(`请求 access_token 数据返回错误, 原因: ${errorMessage}. The access_token result is error, Because ${val.error}.`)
    }

    return request.success(val, 'get access_token successful');
}, error => request.error(`${error}`, 400));

let BaiduFindOne = () => Baidu.findOne({
    'access_token': {
        '$exists': true
    }
}).then(val => {
        if (val) {
            let nowTimestamp = Date.parse(new Date());

            if (nowTimestamp > val.expires_timestamp) {
                return request.error('find access_token successful, But it has expired', 4, val);
            }
            return request.success(val, 'find access_token successful');
        }
        
        return request.error('Data query is successful, But database is empty', 3);
    }, error  => request.error(`Request database error, The reason is ${error}`, 400)
);
