const path = require('path')
const monk = require('monk')
const config = require(path.relative(__dirname, './config/'))

let getCode = async (ctx) => {
	const db = monk(config.mongodb_URL_Home);
	const collection = db.get('code');
	await collection.find().then(function(value){
		// 判断_标签
		let labelArray = [],
		// 返回_结果
			result=[],
			_obj={
				state:1,
				result:result
			};
		for (let i = 0; i < value.length; i++) {
			// 如果 第一个元素
			if ( labelArray.length == 0 ) {
				// 判断_标签 添加
				labelArray.push(value[i].label);
				// 返回_结果 插入新标签
				result.push(addResult(value[i].label));
				// 返回_结果 标签下添加数据
				result[0].data.push(value[i]);
			}else {
				let _length = 0;
				// 循环 判断_标签 进行一次对比
				for (let j = 0; j < labelArray.length; j++) {
					// 如果相同 直接 返回_结果 添加数据
					if ( labelArray[j] == value[i].label ) {
						result[j].data.push(value[i]);
					}else {
					// 如果不相同，那么判断数组 +1
						_length ++
					}
				}
				// 如果 不相同的次数 与 判断_标签的长度 相同
				if (_length == labelArray.length) {
					// 添加 判断_标签
					labelArray.push(value[i].label);
					// 返回_结果 插入新标签
					result.push(addResult(value[i].label));
					// 返回_结果 标签下添加数据
					result[(result.length-1)].data.push(value[i]);
				}
			}
		}
		ctx.body = _obj;
	},function(reason){
		ctx.body = reason
	});
	function addResult(label) {
		let _obj = {
			label:label,
			data:[]
		}
		return _obj
	}
}


module.exports = getCode
