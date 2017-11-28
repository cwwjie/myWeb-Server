module.exports = (() => {
    // 开发环境
    if (process.env.NODE_ENV === 'dev') {
        return {
            // 整个程序的端口
            port: '3000',
            // mongodb 配置
            mongodbURL: 'mongodb://localhost:27017/',
            database: 'test',
            // MySQL 配置
            mysqlURL: 'mysql://Rejiejay:QQ1938167@localhost:3306/',
            mysqlDatabase: 'todo',
            mysqlUsername: 'Rejiejay',
            mysqlPassword: 'QQ1938167',
            mysqlSequelize: {
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                define: {
                    charset: 'utf8',
                    dialectOptions: {
                        collate: 'utf8_general_ci'
                    },
                },
                operatorsAliases: false
            }
        }
    } else {
        return {
            port: '1938',
            mongodbURL: 'mongodb://mywebRejiejay:lsPTpHyoLrUR4eWf@119.29.140.46:19381,119.29.140.46:19382,119.29.140.46:19383',
            database: '/myweb?replicaSet=VM_253_28_centos',
            mysqlURL: 'mysql://Rejiejay:"~!Qq1938167@#0o"@119.29.140.46:2333/',
            mysqlDatabase: 'todo',
            mysqlUsername: 'Rejiejay',
            mysqlPassword: '~!Qq1938167@#0o',
            mysqlSequelize: {
                dialect: 'mysql',
                host: '119.29.140.46',
                port: 2333,
                define: {
                    charset: 'utf8',
                    dialectOptions: {
                        collate: 'utf8_general_ci'
                    },
                }
            }
        }
    }
})();