const path = require('path');
const fs = require('fs');
const monk = require('monk');
const config = require(path.relative(__dirname, './config/'));
const GetRandomNum = require('./../../method/GetRandomNum.js');


let addWriting = async (ctx) => {

	// 判断 限权  如果和约定格式不复合，不让之进行数据库查询
	if ( ctx.request.header.uniquele == undefined || ctx.request.header.identify == undefined || ctx.request.header.uniquele == "null" || ctx.request.header.identify == "null" ) {
		ctx.body = {state:2,result:"You are a visitor"};
		return
	}
	let allow = true;
	// 连接数据库进行一次 限权查询
	const db = monk(config.mongodb_URL_User);
	const collection = db.get('user');
	await collection.findOne({"Uniquele":ctx.request.header.uniquele,"Identify":ctx.request.header.identify}).then(function(value){
		// 如果查询失败返回失败
		if (value == null) {
			allow = false;
			ctx.body = {state:2,result:"uniquele & identify is wrong"};
		}
	},function(reason){
		allow = false;
		ctx.body = {
			state:2,
			result:reason
		}
	});
	db.close();
	if ( allow == false ) {
		ctx.body = {
			state:2,
			result:'uniquele & identify is wrong'
		}
		return
	}



	// 判断是否约定数据库
	if ( ctx.request.body.collection != 'code' && ctx.request.body.collection != 'design' &&  ctx.request.body.collection != 'article' ) {
		ctx.body = {
			state:2,
			result:'collection is wrong'
		}
		return
	}


	// 是否有图片上传
	let _image = false;
	if (ctx.request.body.image != false) {
		// 目标路径
		const _name = GetRandomNum() + ".jpg"
		const _path = path.resolve(__dirname, "./")+'\\'+_name;
		await fs.rename(ctx.request.body.image,_path, function(err){
			if(err){
				allow = false;
				ctx.body = {
					state:2,
					result:err
				}
			}
			_image = _path;
		});
	}
	if ( allow == false ) {
		return
	}


	// 是否有上传详情
	let _detail = false;
	if ( ctx.request.body.detail != false || ctx.request.body.detail != '' ) {
		const db = monk(config.mongodb_URL_Home);
		const collection = db.get('detail');
		const _data = {
			identify:GetRandomNum(),
			content:ctx.request.body.detail
		}
		await collection.insert(_data).then(function(value){
			console.log('detail');
			console.log(value);
			_detail = value.identify
		},function(reason){
			allow = false;
			ctx.body = {
				state:2,
				result:reason
			}
		})
		db.close();
	}
	if ( allow == false ) {
		return
	}



	const timestamp = Date.parse(new Date());
	// 代码
	if ( ctx.request.body.collection == 'code' ) {
		const db = monk(config.mongodb_URL_Home);
		const collection = db.get('code');
		const _data = {
			identify:GetRandomNum(),
			title:ctx.request.body.title,
			label:ctx.request.body.label,
			image:_image,
			content:{
				brief:ctx.request.body.brief,
				detail:_detail
			},
			example:ctx.request.body.example,
			github:ctx.request.body.github,
			time:timestamp,
			read:0,
			like:0
		}
		await collection.insert(_data).then(function(value){
			ctx.body = {
				state:1,
				result:value
			}
		},function(reason){
			ctx.body = {
				state:2,
				result:reason
			}
		})
		db.close();

	}else if ( ctx.request.body.collection == 'design' ) {
	// 设计
		const db = monk(config.mongodb_URL_Home);
		const collection = db.get('design');
		const _data = {
			identify:GetRandomNum(),
			title:ctx.request.body.title,
			label:ctx.request.body.label,
			image:_image,
			content:{
				brief:ctx.request.body.brief,
				detail:_detail
			},
			example:ctx.request.body.example,
			time:timestamp,
			read:0,
			like:0
		}
		await collection.insert(_data).then(function(value){
			ctx.body = {
				state:1,
				result:value
			}
		},function(reason){
			ctx.body = {
				state:2,
				result:reason
			}
		})
		db.close();

	}else if ( ctx.request.body.collection == 'article' ) {
	// 文章
		const db = monk(config.mongodb_URL_Home);
		const collection = db.get('article');
		const _data = {
			identify:GetRandomNum(),
			title:ctx.request.body.title,
			label:ctx.request.body.label,
			image:_image,
			content:{
				brief:ctx.request.body.brief,
				detail:_detail
			},
			time:timestamp,
			read:0,
			like:0
		}
		await collection.insert(_data).then(function(value){
			ctx.body = {
				state:1,
				result:value
			}
		},function(reason){
			ctx.body = {
				state:2,
				result:reason
			}
		})
		db.close();

	}else {
		ctx.body = {
			state:2,
			result:'上传失败'
		}
	}

}


module.exports = addWriting































