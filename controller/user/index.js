const router = require('koa-router')();

const checkLogin = require('./CheckLogin');
const login = require('./Login');


router.get('/checkLogin', checkLogin);
router.post('/login', login);

router.get('/',(ctx, next)=> {
    ctx.body = 'you get /user route';
});

module.exports = router;
