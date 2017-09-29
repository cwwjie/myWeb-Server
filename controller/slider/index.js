const router = require('koa-router')();
const getAll = require('./getAll');

router.get('/getAll', getAll);
router.get('/',(ctx, next)=> {
    ctx.body = '成功获取/slider目录';
});

module.exports = router;
