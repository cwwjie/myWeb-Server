/**
 * TestDBController
 *
 * @description :: Server-side logic for managing testdbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	hello:function(req,res){
		TestDB.create({username:'jy',password:'123456'}).exec(function (err,created){
			obj.aaa= created;
			console.log(created);					//返回的是创建的对象
		})
		TestDB.native(function(err,collection){
			collection.find({}, {
			    name: true
			})
			res.send(obj);
		});
/*		var obj = {};
		TestDB.create({username:'jy',password:'123456'}).exec(function (err,created){
			obj.aaa= created;
			console.log(created);					//返回的是创建的对象
		})
		obj.vvv=TestDB.findOne({username:'jy'});							//返回第一个对象
		obj.asd=TestDB.find({username:'jy'});							//返回一个数组
		obj.qweqwe=TestDB.count({username:'jy'});							//返回结果为一个该结果集的条数
		obj.asdasd=TestDB.destroy({name:'Flynn'});							//销毁找到的结果
		TestDB.findOrCreate({username:'jy'},{username:'jyjy'});	//查询是否有第一个参数的记录，没有就创建第二个参数的记录
		TestDB.update({username:'jy'},{username:'jyjy'});		//修改记录
		obj.adsasd=TestDB.findOne({username:'jy'});							//返回第一个对象
		var _string=JSON.stringify(obj);
		console.log(obj)
		console.log(_string)*/
	}
};

