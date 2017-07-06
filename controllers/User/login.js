const path = require('path')
const monk = require('monk')
const config = require(path.relative(__dirname, './config/'))


let Get = async (ctx) => {
	const db = monk(config.mongodb_URL_User);
	const collection = db.get('home');
	await collection.findOne({"name":"areaDisplay"}).then(function(value){
		ctx.body = value
	},function(reason){
		ctx.body = reason
	});
}


module.exports = Get