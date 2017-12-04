const Router = require('koa-router')();
const dynamic = require('./../controller/dynamic');
const carousel = require('./../controller/carousel');
const todo = require('./../controller/todo');
const user = require('./../controller/user');
const weixin = require('./../controller/weixin');

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
	Router.get(`${baseUrl}`, (ctx, next)=> {
		ctx.body = 'you get / route';
	});
	app.use(Router.routes());
}
