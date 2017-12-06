const encryption = require('./method/encryption');

// 正确响应微信发送的Token验证
module.exports = async (ctx, next) => {
  // 验证请求格式是否正确
	if (inspect(ctx.query) === false) {
		return ctx.body = 'The Request method is mistaken';
  }

  // 将token、timestamp、nonce三个参数进行字典序排序 拼接成一个字符串
  let hashcodeString = ['RejiejayWeChatHandleToken', ctx.query.timestamp, ctx.query.nonce].sort().join('');

  // sha1加密
  let hashcode = encryption.sha1ToLowerCase(hashcodeString);

  // 密字符串 与 signature对比，标识该请求来源于微信
  if (hashcode === ctx.query.signature) {
    ctx.body = ctx.query.echostr;
  } else {
	  ctx.body = 'The Request is not from WeChat source';
  }
}

let inspect = (data) => {
  if (
    !data.signature || 
    !data.echostr || 
    !data.timestamp || 
    !data.nonce
  ) {
    return false
  } else {
    return true
  }
}
