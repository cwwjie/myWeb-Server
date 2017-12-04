const path = require('path');
const request = require(path.relative(__dirname, './method/request'));
const model = require('./model');
const sequelize = require('sequelize');

module.exports = async (ctx, next) => {
    ctx.body = await model.sequelize.query('select * from todos where createTime in (select max(createTime) from todos group by category) order by createTime DESC;').then(
        project => {
            if (project[0].length !== 0) {
                return request.success(project[0])
            }
            return request.error('Database query success, But database is empty', 2)
        },
        error => request.error(`Database query error, The reason is ${error}`)
    );
};
