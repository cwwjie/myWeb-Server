// URL文档  https://docs.mongodb.com/manual/reference/connection-string
const Dev_mongodb = "mongodb://HomeUser:Qq1938167@119.29.140.46:27017";
const Pro_mongodb = "mongodb://UserRejiejay:lsPTpHyoLrUR4eWf@119.29.140.46:19381,119.29.140.46:19382,119.29.140.46:19383";

// mongodb环境变量
// 测试环境下是:Dev_mongodb ""
// 生产环境下是:Pro_mongodb "?replicaSet=VM_253_28_centos"
const mongodb_URL_Base = Pro_mongodb;
const mongodb_ENV = "?replicaSet=VM_253_28_centos";
// 这里是配置信息，以后想看配置信息就在这里看
const config = {
	// 监听端口
	HTTP_server_port:"3193",
	// 连接 Home 数据库 的 URL
	mongodb_URL_Home: mongodb_URL_Base + "/Home" + mongodb_ENV,
	mongodb_URL_User: mongodb_URL_Base + "/User" + mongodb_ENV
}

module.exports = config