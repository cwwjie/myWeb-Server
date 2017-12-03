const router = require('koa-router')();
const createItem = require('./createItem');
const getAllByTime = require('./getAllByTime');
const getAllCategory = require('./getAllCategory');

router.post('/createItem', createItem);
router.get('/getAllByTime', getAllByTime);
router.get('/getAllCategory', getAllCategory);
router.get('/',(ctx, next)=> {
    ctx.body = 'you get /todo route';
});

module.exports = router;
