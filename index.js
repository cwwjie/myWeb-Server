const Koa = require('koa');
const koaBody = require('koa-body');

const router = require('./router');
const config = require('./config');

const app = new Koa();

app.use(koaBody({
	urlencoded: false,
	text: false,
}));

router(app);

app.listen(config.port);
