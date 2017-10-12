const Koa = require('koa');
const koaBody = require('koa-body');

const router = require('./router');
const config = require('./config');

const app = new Koa();

app.use(koaBody({
	multipart: false, // 不解析 multi 表单部分
	strict: false, // 不解析 GET HEAD DELETE 请求
	urlencoded: false,
	text: false,
}));


// 解决跨域的问题
app.use((ctx, next) => {
	const NODE_ENV = process.env.NODE_ENV || '';

    if (NODE_ENV === 'dev') {
		ctx.set('Access-Control-Allow-Origin', ctx.header.origin)
		ctx.set('Access-Control-Allow-Credentials', true) // 允许CORS请求请求带上 cookie
		ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept') //  上可以携带的header参数
		ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
	} else {
	// 	if (
	// 		ctx.header.origin === 'https://rejiejay.cn' ||
	// 		ctx.header.origin === 'https://www.rejiejay.cn'
	// 	) {
	//		ctx.set('Access-Control-Allow-Origin', ctx.header.origin)
			ctx.set('Access-Control-Allow-Credentials', true) // 允许CORS请求请求带上 cookie
			ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept') //  上可以携带的header参数
			ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
	// 	}
	}
	return next()
})

router(app);

app.use((ctx, next)=>{
	switch (ctx.status) {
		case 404:
			ctx.body = '404'
		break
	}
	return next()
});

app.listen(config.port);
