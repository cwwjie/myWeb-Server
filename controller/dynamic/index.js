const router = require('koa-router')();

router.get('/',(ctx, next)=> {
    ctx.body = 'you get /dynamic route';
});

module.exports = router;
