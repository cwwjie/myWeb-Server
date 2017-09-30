module.exports = (() => {
    // 开发环境
    if (process.env.NODE_ENV === 'dev') {
        return {
            port: '3000',
            mongodbURL: 'mongodb://localhost:27017/',
            database: 'test'
        }
    }
})();