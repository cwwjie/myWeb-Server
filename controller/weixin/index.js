const router = require('koa-router')();

const handleToken = require('./handleToken');

router.get('/handleToken', handleToken);
router.get('/',(ctx, next)=> {
	ctx.body = 'you get /weixin route';
});

module.exports = router;
