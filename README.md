# website-BackEndS2
个人网站第二期后端 Restful API 部分

# 初始化

  $ npm install sails -g
  $ sails new sailsjs

# 启动

  $ sails lift

# 如何生成 RESTful API

1.生成API模板

  $ sails generate api Home(API的名称)

2.连接芒果数据库

  $ npm install sails-mongo --save

    // config/connections.js
    module.exports.connections = {
      localMongoDb: {
        adapter: 'sails-mongo',			// 表示 Waterline 映射那种数据库
        host: 'localhost', 				// 定义数据库的地址
        port: 27017, 					// 定义数据库的端口
        user: 'username_here', 			// 登陆数据库的账号
        password: 'password_here',		// 登陆数据库的密码
        database: 'database_name_here'	// 选择 MongoDb 的哪个数据库
      }
    };
    // module Home.js
    module.exports = {
      connection: 'localMongoDb'
    }

3.sailsjs里面 Mogodb数据库的链接 sailsjs里面models文件夹 和 Mogodb数据库里面的collection集合 是对应的。

4.最后写Controller，然后配置路由就可以了。

    // module HomeController.js
    getALL: function (req,res) {
      Home.native(function(err, collection) {
        // 如果出错报错
        if (err) return res.serverError(err);
        // find(query)查询方法 http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
        collection.find({"name" : "scrollPicture"}).toArray(function(err, results) {
          if (err) return res.serverError(err);
          return res.ok(results);
        });
      });
    }
    // /config/routes.js 中定义好请求方法
    'GET /Home/getALL':'HomeController.getALL'

5.完成

    => "http://localhost:1337/Home/getALL";
