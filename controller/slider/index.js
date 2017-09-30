const router = require('koa-router')();
const getAll = require('./getAll');

router.get('/getAll', getAll);
router.get('/',(ctx, next)=> {
    ctx.body = 'you get /slider route';
});

module.exports = router;
