const path = require('path')
const monk = require('monk')
const config = require(path.relative(__dirname, './config/'))

let getDetail = async (ctx) => {
	const db = monk(config.mongodb_URL_Home);
	const collection = db.get('detail');
	let _obj = {}; 
	await collection.findOne({identify:ctx.request.body.identify}).then(function(value){
		if (value == null) {
			ctx.body = {
				status:'identify is error'
			};
			return
		}else {
			ctx.body = {
				status:1,
				result:value.content
			};
			return
		}
	});
}


module.exports = getDetail
