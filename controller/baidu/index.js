const router = require('koa-router')();

const getAccessToken = require('./getAccessToken');

router.get('/getAccessToken', getAccessToken);
router.get('/',(ctx, next)=> {
	ctx.body = 'you get /baidu route';
});

module.exports = router;
