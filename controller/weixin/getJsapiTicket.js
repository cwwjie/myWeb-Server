const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const AccessToken = require('./method/Access_token');
const WeChat = require('./model/WeChat');
const getjsonby = require('./method/getjsonbyhttps');

/**
 * 获取 jsapi_ticket 接口 /ticket
 * 如果数据库 存在 jsapi_ticket, 并且 expires_timestamp 未过期. 返回 jsapi_ticket.
 * 如果数据库 不存在 jsapi_ticket, 或 expires_timestamp 过期. 获取微信 jsapi_ticket 并且返回.
 */
module.exports = async (ctx, next) => {
  let expiresJsapiTicket;

  // 数据库查询 jsapi_ticket
  let findJsapi_ticket = await WeChatFindOne();

  // 如果数据库 存在 jsapi_ticket, 并且 expires_timestamp 未过期. 返回 jsapi_ticket.
  if (findJsapi_ticket.result === 1) {
    ctx.body = findJsapi_ticket;
    return
  } else if (findJsapi_ticket.result === 4) { // 过期
    expiresJsapiTicket = findJsapi_ticket.data;
  } else if (findJsapi_ticket.result === 400) { // 请求错误
    ctx.body = findJsapi_ticket;
    return
  }

  // 如果数据库 不存在 jsapi_ticket, 或 expires_timestamp 过期. 获取微信 jsapi_ticket
  // 获取 jsapi_ticket 依赖 access_token
  let getAccess_token = await AccessToken();
  if (getAccess_token.result !== 1) {
    ctx.body = request.error(`jsapi_ticket expired and access_token error, The reason is ${getAccess_token.message}`);
    return
  }
  
  let getJsapi_ticket = await getWeixinticket(getAccess_token.data.access_token);
  
  // 如果发生错误, 返回错误信息
  if (getJsapi_ticket.result !== 1) {
    ctx.body = getJsapi_ticket;
    return
  } else { // 储存到数据库
    let wechat_jsapi_ticket = {
      'jsapi_ticket': getJsapi_ticket.data.ticket,
      'expires_timestamp': getJsapi_ticket.data.expires_in * 1000 + Date.parse(new Date())
    }
    
    let saveJsapiTicket;
    if (getJsapi_ticket.result === 4) { // 过期
      saveJsapiTicket = await WeChatUpdate(expiresJsapiTicket._id, wechat_jsapi_ticket);
    } else {
      saveJsapiTicket = await WeChatSave(wechat_jsapi_ticket);
    }
    
    // 存储成功 返回结果
    if (saveJsapiTicket.result === 1) {
      ctx.body = request.success(wechat_jsapi_ticket, 'get jsapi_ticket successful and jsapi_ticket storage in database');
    } else { // 存储失败
      ctx.body = saveJsapiTicket;
    }
  }
}

let WeChatSave = (wechat_jsapi_ticket) => new WeChat(wechat_jsapi_ticket)
  .save()
  .then(
    (val) => request.success(val, 'get jsapi_ticket successful and jsapi_ticket storage in database'),
    (error) => request.error(`get jsapi_ticket successful, but can not storage. Because ${error}`, 400)
  )

let WeChatUpdate = (id, wechat_jsapi_ticket) => WeChat.findOneAndUpdate({
    '_id': id
  }, {
    '$set': {
      'jsapi_ticket': wechat_access_token.jsapi_ticket,
      'expires_timestamp': wechat_access_token.expires_timestamp
    }
  }).then(
    (val) => request.success(val, 'get jsapi_ticket successful and jsapi_ticket update in database'),
    (error) => request.error(`get jsapi_ticket successful, but can not update database. The reason is ${error}`, 400)
  )

let getWeixinticket = (access_token) => getjsonby(
  `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`
).then((val) => {
  // val = {
  //   "errcode":0,
  //   "errmsg":"ok",
  //   "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
  //   "expires_in":7200
  // }
  if (val.errcode === 0) {
    return request.success(val, 'get jsapi_ticket successful');
  }
  return request.error(`The jsapi_ticket result is error, The reason is ${val.errmsg}.`)
  
}, (error) => request.error(`Request jsapi_ticket error, The reason is ${error}`, 400));


let WeChatFindOne = () => WeChat.findOne({
    'jsapi_ticket': {
      '$exists': true
    }
  }).then(
    (val) => {
      if (val) {
        let nowTimestamp = Date.parse(new Date());

        if (nowTimestamp > val.expires_timestamp) {
          return request.error('find jsapi_ticket successful, But it has expired', 4, val);
        }
        return request.success(val, 'find jsapi_ticket successful');
      }

      return request.error('Request jsapi_ticket is successful, But database is empty', 3);
    }, (error) => request.error(`Request jsapi_ticket error in database, The reason is ${error}`, 400)
  );
