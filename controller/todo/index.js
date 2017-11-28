const router = require('koa-router')();
const getAllByTime = require('./getAllByTime');

router.get('/getAllByTime', getAllByTime);
router.get('/',(ctx, next)=> {
    ctx.body = 'you get /todo route';
});

module.exports = router;
