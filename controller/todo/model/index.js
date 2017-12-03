const path = require('path');
const config = require(path.relative(__dirname, './config/'));
const Sequelize = require('sequelize');

// const sequelize = new Sequelize(`${config.mysqlURL}todo?useUnicode=true&characterEncoding=UTF-8`);
const sequelize = new Sequelize(
  config.mysqlDatabase,
  config.mysqlUsername,
  config.mysqlPassword,
  config.mysqlSequelize
);
const Todo = sequelize.define('todo', {
  'id': {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'unique': true,
    'autoIncrement': true,
    'primaryKey': true
  },
  'description': {
    'type': Sequelize.STRING(50),
    'allowNull': false,
  },
  'isComplete': {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'defaultValue': 0
  },
  'category': {
    'type': Sequelize.STRING(10),
    'allowNull': false,
    'defaultValue': '未分类'
  },
  'priority': {
    'type': Sequelize.INTEGER,
    'allowNull': false,
    'defaultValue': 0
  },
  'createTime': {
    'type': Sequelize.BIGINT,
    'allowNull': false,
    'defaultValue': Date.parse(new Date())
  },
});
module.exports.sequelize = sequelize;
module.exports.Todo = Todo;

// CREATE TABLE IF NOT EXISTS `todos` (
//   `id` INTEGER NOT NULL auto_increment UNIQUE , 
//   `description` VARCHAR(50) NOT NULL, 
//   `isComplete` INTEGER NOT NULL DEFAULT 0, 
//   `category` VARCHAR(10) NOT NULL DEFAULT '未分类', 
//   `priority` INTEGER NOT NULL DEFAULT 0, 
//   `createTime` BIGINT NOT NULL DEFAULT 1512042227000, 
//   `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, 
//   UNIQUE `todos_id_unique` (`id`), 
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

// Todo.sync({force: true}).then(() => {
//   // 表已创建
//   return Todo.create({
//     id: 1,
//     description: '任务一',
//     category: '无分类',
//     priority: 1,
//     isComplete: 0,
//     createTime: Date.parse(new Date()),
//   });
// });

// Todo.create({
//   description: '任务',
//   category: '无分类',
//   priority: 1,
//   isComplete: 0,
//   createTime: Date.parse(new Date()),
// });
