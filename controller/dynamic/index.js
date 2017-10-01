const router = require('koa-router')();
const createDynamic = require('./CreateDynamic');
const getDynamicByRandom = require('./GetDynamicByRandom.js');
const getDynamicByTime = require('./GetDynamicByTime.js');

router.get('/',(ctx, next)=> { ctx.body = 'you get /dynamic route' });
router.post('/', createDynamic);

router.get('/getdata/sortbytime', getDynamicByTime); // ?sequence=up
router.get('/getdata/sortbyrandom', getDynamicByRandom);



module.exports = router;
