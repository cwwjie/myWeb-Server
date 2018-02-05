const router = require('koa-router')();

const Create = require('./Create');
const Delete = require('./Delete');
const Modify = require('./Modify');
const Get = require('./Get');

router.post('/create', Create);
router.post('/delete', Delete);
router.post('/modify', Modify);
router.get('/get', Get);
router.get('/',(ctx, next)=> {
	ctx.body = 'you get /english route';
});

module.exports = router;
