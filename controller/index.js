const Router = require('koa-router')();
const dynamic = require('./dynamic');
const carousel = require('./carousel');
const todo = require('./todo');
const user = require('./user');
const weixin = require('./weixin');
const baidu = require('./baidu');

module.exports = function(app) {
	let NODE_ENV = process.env.NODE_ENV || '',
			baseUrl;

	if (NODE_ENV === 'dev') {
		baseUrl = '/';
	} else {
		baseUrl = '/server/';
	}

	Router.use(`${baseUrl}dynamic`, dynamic.routes());
	Router.use(`${baseUrl}carousel`, carousel.routes());
	Router.use(`${baseUrl}todo`, todo.routes());
	Router.use(`${baseUrl}user`, user.routes());
	Router.use(`${baseUrl}weixin`, weixin.routes());
	Router.use(`${baseUrl}baidu`, baidu.routes());
	Router.get(`${baseUrl}`, (ctx, next)=> {
		ctx.body = 'you get / route';
	});
	app.use(Router.routes());
}
