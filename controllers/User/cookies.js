const path = require('path')
const monk = require('monk')
const config = require(path.relative(__dirname, './config/'))


/**
 * 验证
 */
let cookies = async (ctx,next) => {
	// 判断 请求头  如果和约定格式不复合，不通过
	if (ctx.request.type != "application/json") {
		ctx.body = {result:false,info:"Content-Type:application/json"};
		return
	}
	// 判断 数据的格式  如果和约定格式不复合，不让之进行数据库查询
	if (ctx.request.header.uniquele == undefined || ctx.request.header.identify == undefined) {
		ctx.body = {result:false,info:"Data format error"};
		return
	}
	// 判断 数据的格式 如果是约定的null，不让之进行数据库查询，返回你是游客
	if (ctx.request.header.uniquele == "null" || ctx.request.header.identify == "null") {
		ctx.body = {result:false,info:"You are a visitor"};
		return
	}
	// // 连接数据库进行一次查询
	const db = monk(config.mongodb_URL_User);
	const collection = db.get('user');
	await collection.findOne({"Uniquele":ctx.request.header.uniquele,"Identify":ctx.request.header.identify}).then(function(value){
		// 如果查询失败返回失败
		if (value == null) {
			ctx.body = {result:false,info:"uniquele & identify is wrong"};
		}else {// 查找到成功返回结果
			ctx.body = {result:true,info:"Check the correct"};
		}
	},function(reason){
		ctx.body = reason
	});
	db.close();
}


module.exports = cookies