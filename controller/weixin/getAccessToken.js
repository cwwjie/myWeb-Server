const AccessToken = require('./method/Access_token');

module.exports = async (ctx, next) => {
    ctx.body = await AccessToken();
}
