const path = require('path')
const monk = require('monk')
const config = require(path.relative(__dirname, './config/'))
const fs = require('fs');// File System 这个是文件I/O
const formidable = require("formidable");


let uploadImg = async (ctx, next) => {
	// 判断 限权  如果和约定格式不复合，不让之进行数据库查询
	if ( ctx.request.header.uniquele == undefined || ctx.request.header.identify == undefined || ctx.request.header.uniquele == "null" || ctx.request.header.identify == "null" ) {
		ctx.body = {state:2,result:"You are a visitor"};
		return
	}
	let allow = false;
	// 连接数据库进行一次 限权查询
	const db = monk(config.mongodb_URL_User);
	const collection = db.get('user');
	await collection.findOne({"Uniquele":ctx.request.header.uniquele,"Identify":ctx.request.header.identify}).then(function(value){
		// 如果查询失败返回失败
		if (value == null) {
			ctx.body = {state:2,result:"uniquele & identify is wrong"};
		}else {// 查找到成功返回结果
			allow = true;
		}
	},function(reason){
		ctx.body = {
			state:2,
			result:reason
		}
	});
	db.close();
	if ( allow == false ) {
		return
	}



	// 接收到的数据
	const _file = ctx.request.body
	let upload = new Promise(function (resolve, reject) {
		let form = new formidable.IncomingForm({uploadDir:path.join(__dirname, './../../upload')}),
			fields = {},
			filepath = "",
			files = {};
		form.on('end', function () {
			return resolve(filepath)
		}).on('error', function (err) {
			return reject(err);
		}).on('field', function (field, value) {
			if (fields[field]) {
				if (Array.isArray(fields[field])) {
					fields[field].push(value);
				} else {
					fields[field] = [fields[field], value];
				}
			} else {
				fields[field] = value;
			}
		}).on('file', function (field, file) {
			filepath = file.path
			if (files[field]) {
				if (Array.isArray(files[field])) {
					files[field].push(file);
				} else {
					files[field] = [files[field], file];
				}
			} else {
				files[field] = file;
			}
		});
		form.parse(ctx.req);
	});
	await upload.then(function(path){
		// 这里面 path 是临时文件 会定时进行清空
		// 真正绑定会用到这个 临时文件 现阶段只需要保存好 URL 就行了
		// fs.rename(file.path, global.appConfig.uploadDir + '/' + file.filename);
		// 真正绑定的时候再把文件命名上去！
		ctx.body = {
			state:1,
			result:path
		}
	},function(reason){
		ctx.body = {
			state:2,
			result:reason
		}
	})
}




module.exports = uploadImg
