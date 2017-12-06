const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const model = require('./model');
const sequelize = require('sequelize');

module.exports = async (ctx, next) => {
    ctx.body = await model.Todo.findAll({
        'where': {
            'isComplete': 0
        },
        'order': sequelize.col('createTime')
    }).then(
        project => {
            if (project !== null) {
                return request.success(project, 'Database query success')
            }
            return request.error('Database query success, But database is empty', 2)
        },
        error => request.error(`Database query error, The reason is ${error}`)
    );
};
