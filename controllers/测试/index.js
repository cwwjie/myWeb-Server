const path = require('path')
const monk = require('monk')
const config = require(path.relative(__dirname, './config/'))


let Get = async (ctx) => {
	const db = monk(config.mongodb_URL_Home);
	const collection = db.get('article');
	// await collection.find().then(function(value){
	// 	ctx.body = value
	// },function(reason){
	// 	ctx.body = reason
	// });
	let _data = {},
		allow = true;
	await collection.findOne({identify:'Bm9Y64Bx4SJUS8HZ'}).then(function(value){
		if (value == null) {
			allow = false;
			ctx.body = '查询失败';
		}else {
			value.read = value.read + 1 ;
			_data = value;
		}
		return
	},function(reason){
		ctx.body = reason;
		return
	});
	if (!allow) {return}
	await collection.update({identify:'Bm9Y64Bx4SJUS8HZ'},_data).then(function(_value){
		ctx.body = _data
	},function(_reason){
		ctx.body = _reason;
	})
	db.close()
}


module.exports = Get
