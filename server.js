const Koa2 = require('koa');
const config = require("./config");
const KoaBody = require("koa-body");
const Routes = require("./routes");
const app = new Koa2();

// 初始化加载进来解析请求部分
app.use(KoaBody({
	multipart: true,  // 是否解析 multi 表单部分
	strict: false,    // 默认 true 不解析 GET HEAD DELETE 请求
	formidable: {     // 用来传递multi解析的详情
		// uploadDir: path.join(__dirname, '../assets/uploads') // 设置放置文件上传的目录到/assets/uploads
	}
}))
// 这里是 RESTful API 核心区、预计会产生大量的代码、代码逻辑要做好分层、
app.use(Routes.routes());
// 当以上都未拦截到返回，就返回404页面
app.use((ctx, next)=>{
	switch (ctx.status) {
		case 404:
			ctx.body = '404'
		break
	}
	return next()
});




console.log("端口启动在--"+config.HTTP_server_port)
app.listen(config.HTTP_server_port);