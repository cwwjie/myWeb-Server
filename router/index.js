const Router = require('koa-router')();
const slider = require('./../controller/slider');
const dynamic = require('./../controller/dynamic');
const user = require('./../controller/user');

const NODE_ENV = process.env.NODE_ENV || '';

module.exports = function(app) {
	if (NODE_ENV === 'dev') {
		Router.use('/dynamic',dynamic.routes());
		Router.use('/slider',slider.routes());
		Router.use('/user',user.routes());
		Router.get('/', (ctx,next)=> {
			ctx.body = 'you get / route';
		});
		app.use(Router.routes());
	} else {
		Router.use('/server/dynamic',dynamic.routes());
		Router.use('/server/slider',slider.routes());
		Router.use('/server/user',user.routes());
		Router.get('/server', (ctx,next)=> {
			ctx.body = 'you get / route';
		});
		app.use(Router.routes());

	}

}
