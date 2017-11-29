const router = require('koa-router')();
const Todo = require('./model');
const request = require('./method/request');
const sequelize = require('sequelize');

module.exports = async (ctx, next) => {
    ctx.body = await Todo.findAll({
        'where': {
            'isComplete': 0
        },
        'order': sequelize.col('createTime')
    }).then(
        project => {
            if (project !== null) {
                return request.success(project)
            }
            return request.error('Database query success, But database is empty', 2)
        },
        error => request.error(`Database query error, The reason is ${error}`)
    );
};
