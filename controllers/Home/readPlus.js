const path = require('path')
const monk = require('monk')
const config = require(path.relative(__dirname, './config/'))

let readPlus = async (ctx) => {
	const db = monk(config.mongodb_URL_Home);
	if (ctx.request.body.collection == 'code') {
		const collection = db.get('code');
		let allow = false,
			_obj = {}; 
		await collection.findOne({identify:ctx.request.body.identify}).then(function(value){
			if (value == null) {
				ctx.body = {status:'identify is error'}
				return
			}
			_obj = value;
			_obj.read = _obj.read + 1 ;
			allow = true;
		});
		if (allow == false) {return}
		await collection.update({identify:ctx.request.body.identify},_obj).then(function(value){
			ctx.body = {status:1}
		});
		return
	}else if (ctx.request.body.collection == 'design') {
		const collection = db.get('design');
		let allow = false,
			_obj = {}; 
		await collection.findOne({identify:ctx.request.body.identify}).then(function(value){
			if (value == null) {
				ctx.body = {status:'identify is error'}
				return
			}
			_obj = value;
			_obj.read = _obj.read + 1 ;
			allow = true;
		});
		if (allow == false) {return}
		await collection.update({identify:ctx.request.body.identify},_obj).then(function(value){
			ctx.body = {status:1}
		});
		return
	}else if (ctx.request.body.collection == 'article') {
		const collection = db.get('article');
		let allow = false,
			_obj = {}; 
		await collection.findOne({identify:ctx.request.body.identify}).then(function(value){
			if (value == null) {
				ctx.body = {status:'identify is error'}
				return
			}
			_obj = value;
			_obj.read = _obj.read + 1 ;
			allow = true;
		});
		if (allow == false) {return}
		await collection.update({identify:ctx.request.body.identify},_obj).then(function(value){
			ctx.body = {status:1}
		});
		return
	}else {
		ctx.body = {status:'collection is error'}

	}
}


module.exports = readPlus
