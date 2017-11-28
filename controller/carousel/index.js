const router = require('koa-router')();
const getAllImg = require('./getAllImg');

router.get('/get', getAllImg);
router.get('/',(ctx, next)=> {
    ctx.body = 'you get /slider route';
});

module.exports = router;
