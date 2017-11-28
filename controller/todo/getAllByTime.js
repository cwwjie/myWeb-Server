const router = require('koa-router')();
const Todo = require('./model');
const sequelize = require('sequelize');

module.exports = async (ctx, next) => {
    let mytodo = await Todo.findAll({
        'where': {
            'isComplete': 0
        },
        'order': sequelize.col('createTime')
    }).then(project => {
        console.log(project)
        if (project !== null) {
            return project
        }
        return '没有查询到任何东西噢'
    }, error => ('error'));
    ctx.body = mytodo;
};
