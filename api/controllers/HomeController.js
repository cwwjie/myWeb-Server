/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getScroll:function (req,res) {
		Home.native(function(err, collection) {
			if (err) return res.serverError(err);
			collection.findOne({"name":"scrollPicture"}).then(function(value){
				return res.ok(value);
			},function(reason){
				return res.serverError(reason);
			});
		});
	},
	getDisplay:function (req,res) {
		Home.native(function(err, collection) {
			if (err) return res.serverError(err);
			collection.findOne({"name":"areaDisplay"}).then(function(value){
				return res.ok(value);
			},function(reason){
				return res.serverError(reason);
			});
		});
	}
};

