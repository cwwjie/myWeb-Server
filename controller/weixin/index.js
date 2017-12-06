const router = require('koa-router')();

const handleToken = require('./handleToken');
const getAccessToken = require('./getAccessToken');
const getJsapiTicket = require('./getJsapiTicket');

router.get('/handleToken', handleToken);
router.get('/getAccessToken', getAccessToken);
router.get('/getJsapiTicket', getJsapiTicket);
router.get('/',(ctx, next)=> {
	ctx.body = 'you get /weixin route';
});

module.exports = router;
