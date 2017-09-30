const router = require('koa-router')();
const createDynamic = require('./CreateDynamic');

router.get('/',(ctx, next)=> { ctx.body = 'you get /dynamic route' });
router.post('/', createDynamic);

module.exports = router;
