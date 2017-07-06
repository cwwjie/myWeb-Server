const path = require('path');
const monk = require('monk');
const config = require(path.relative(__dirname, './config/'));
const GetRandomNum = require('./../../method/GetRandomNum.js');


let deleteWriting = async (ctx) => {
	console.log(ctx.request.body)

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


	if ( ctx.request.body.collection == 'code' ) {
		// 代码

		const db = monk(config.mongodb_URL_Home);
		const collection = db.get('code');
		const _data = {
			identify:ctx.request.body.identify
		}
		await collection.remove(_data).then(function(value){
			if (value.result.n == 1) {
				ctx.body = {
					state:1,
					result:value
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
				result:'Unknown reason ：'+reason
			}
		})
		db.close();

	}else if ( ctx.request.body.collection == 'design' ) {
		// 设计

		const db = monk(config.mongodb_URL_Home);
		const collection = db.get('design');
		const _data = {
			identify:ctx.request.body.identify
		}
		await collection.remove(_data).then(function(value){
			if (value.result.n == 1) {
				ctx.body = {
					state:1,
					result:value
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
				result:'Unknown reason ：'+reason
			}
		})
		db.close();
 
	}else if ( ctx.request.body.collection == 'article' ) {
		// 文章 

		const db = monk(config.mongodb_URL_Home);
		const collection = db.get('article');
		const _data = {
			identify:ctx.request.body.identify
		}
		await collection.remove(_data).then(function(value){
			if (value.result.n == 1) {
				ctx.body = {
					state:1,
					result:value
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
				result:'Unknown reason ：'+reason
			}
		})
		db.close();

	}
}


module.exports = deleteWriting































