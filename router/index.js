const Router = require('koa-router')();
const slider = require('./../controller/slider');

module.exports = function(app) {
	Router.use('/slider',slider.routes());
    Router.get('/', (ctx,next)=> {
        ctx.body = '成功获取/目录';
    });
    app.use(Router.routes());
}
