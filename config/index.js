module.exports = (() => {
    // 开发环境
    if (process.env.NODE_ENV === 'dev') {
        return {
            port: '3000',
            mongodbURL: 'mongodb://localhost:27017/',
            database: 'test'
        }
    } else {
        return {
            port: '1938',
            mongodbURL: 'mongodb://mywebRejiejay:lsPTpHyoLrUR4eWf@119.29.140.46:19381,119.29.140.46:19382,119.29.140.46:19383',
            database: '/myweb?replicaSet=VM_253_28_centos'
        }
    }
})();