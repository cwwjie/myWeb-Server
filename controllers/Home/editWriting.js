const path = require('path');
const monk = require('monk');
const config = require(path.relative(__dirname, './config/'));
const GetRandomNum = require('./../../method/GetRandomNum.js');


let editWriting = async (ctx) => {
	console.log(ctx.request.body);

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

	// 判断是否有图片修改
		// 表示 无更新
	let _image = ctx.request.body.imageURL;
	if ( ctx.request.body.image != false ) {
		// 表示 有更新
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


	// 是否有详情更新
	let _detail = false;
	if ( ctx.request.body.detailRUL == false ) {
		// 表示 无更新 + 原本无数据
	}else if ( ctx.request.body.detailRUL == 'change' ) {
		// 表示 有更新
		const db = monk(config.mongodb_URL_Home);
		const collection = db.get('detail');
		const _data = {
			identify:GetRandomNum(),
			content:ctx.request.body.detail
		}
		await collection.insert(_data).then(function(value){
			_detail = value.identify
		},function(reason){
			allow = false;
			ctx.body = {
				state:2,
				result:reason
			}
		})
		db.close();
	}else {
		// 表示 无更新 + 有数据
		_detail = ctx.request.body.detailRUL;
	}
	if ( allow == false ) {
		return
	}



	const timestamp = Date.parse(new Date());
	if ( ctx.request.body.collection == 'code' ) {

		// 代码
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
		await collection.update({identify:ctx.request.body.identify},_data).then(function(value){
			if (value.n == 1) {
				ctx.body = {
					state:1,
					result:'Congratulations on your success'
				}
			}else {
				ctx.body = {
					state:2,
					result:'identify is wrong'
				}
			}
		},function(reason){
			ctx.body = {
				state:2,
				result:reason
			}
		})
		db.close();

	}else if ( ctx.request.body.collection == 'design' ) {

		// 代码
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
		await collection.update({identify:ctx.request.body.identify},_data).then(function(value){
			if (value.n == 1) {
				ctx.body = {
					state:1,
					result:'Congratulations on your success'
				}
			}else {
				ctx.body = {
					state:2,
					result:'identify is wrong'
				}
			}
		},function(reason){
			ctx.body = {
				state:2,
				result:reason
			}
		})
		db.close();

	}else if ( ctx.request.body.collection == 'article' ) {

		// 代码
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
			example:ctx.request.body.example,
			time:timestamp,
			read:0,
			like:0
		}
		await collection.update({identify:ctx.request.body.identify},_data).then(function(value){
			if (value.n == 1) {
				ctx.body = {
					state:1,
					result:'Congratulations on your success'
				}
			}else {
				ctx.body = {
					state:2,
					result:'identify is wrong'
				}
			}
		},function(reason){
			ctx.body = {
				state:2,
				result:reason
			}
		})
		db.close();

	}







}


module.exports = editWriting































