const router = require('koa-router')();
const createDynamic = require('./CreateDynamic');
const deleteDynamic = require('./DeleteDynamic');
const getDynamicByRandom = require('./GetDynamicByRandom.js');
const getDynamicByTime = require('./GetDynamicByTime.js');
const updateDynamic = require('./UpdateDynamic.js');
const updateDynamicUpvote = require('./UpdateDynamicUpvote.js');
const updateDynamicThoughtsCount = require('./UpdateDynamicThoughtsCount.js');

router.get('/',(ctx, next)=> { ctx.body = 'you get /dynamic route' });
router.post('/', createDynamic);

router.post('/delete', deleteDynamic);

router.get('/getdata/sortbytime', getDynamicByTime); // ?sequence=up
router.get('/getdata/sortbyrandom', getDynamicByRandom);

router.post('/update', updateDynamic);
router.post('/update/upvote', updateDynamicUpvote);
router.post('/update/thoughtsCount', updateDynamicThoughtsCount);


module.exports = router;
