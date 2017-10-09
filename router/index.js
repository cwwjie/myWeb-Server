const Router = require('koa-router')();
const slider = require('./../controller/slider');
const dynamic = require('./../controller/dynamic');
const user = require('./../controller/user');

module.exports = function(app) {
	Router.use('/dynamic',dynamic.routes());
	Router.use('/slider',slider.routes());
	Router.use('/user',user.routes());
    Router.get('/', (ctx,next)=> {
        ctx.body = 'you get / route';
    });
    app.use(Router.routes());
}
