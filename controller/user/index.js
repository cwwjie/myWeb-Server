const router = require('koa-router')();

const checkLogin = require('./CheckLogin');


router.get('/checkLogin', checkLogin);

router.get('/',(ctx, next)=> {
    ctx.body = 'you get /user route';
});

module.exports = router;
