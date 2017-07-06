const path = require('path')
const monk = require('monk')
const config = require(path.relative(__dirname, './config/'))

const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
// 生成 长度为 9 的混淆字符串方法
const GetRandomNum = () => {
	let res = "";
	for(let i = 0; i < 9 ; i ++) {
		let id = Math.ceil(Math.random()*61);
		res += chars[id];
	}
	return res;
}

let login = async (ctx,next) => {
	let allow = false
	// 判断 请求头  如果和约定格式不复合，不通过
	if (ctx.request.type != "application/json") {
		ctx.body = {result:false,info:"Content-Type:application/json"};
		return
	}
	// 判断 数据的格式  如果和约定格式不复合，不让之进行数据库查询
	if (ctx.request.body.Username == undefined || ctx.request.body.Password == undefined || ctx.request.body.Username == "" || ctx.request.body.Password == "") {
		ctx.body = {result:false,info:"Data format error"};
		return
	}
	let obj = {};
	const db = monk(config.mongodb_URL_User);
	const collection = db.get('user');
	await collection.findOne({"Username":ctx.request.body.Username,"Password":ctx.request.body.Password}).then(function(value){
		// 如果查询失败返回失败
		if (value == null) {
			ctx.body = {result:false,info:"Username password is wrong"};
			db.close();
		}else {// 查找到成功继续查找
			allow = true
			obj = value
		}
	},function(reason){
		ctx.body = reason
		db.close();
	});
	// 如果上面的查询失败，终止执行
	if (allow == false) {
		return
	}
	// 进行混淆
	obj.Uniquele = GetRandomNum();
	obj.Identify = GetRandomNum();
	await collection.update({"Username":ctx.request.body.Username,"Password":ctx.request.body.Password},obj).then(function(value){
		// 如果插入成功，返回整个对象
		if (value.ok == 1) {
			ctx.body = obj
		}else {
			ctx.body = {result:false,info:"Operation database failed"};
		}
		db.close();
	},function(reason){
		ctx.body = reason
		db.close();
	});
}


module.exports = login