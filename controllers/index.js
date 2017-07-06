let requireDirectory = require('require-directory')


// requireDirectory 这个模块很诡异、
// https://www.npmjs.com/package/require-directory
// 递归迭代指定的目录，require（）每个文件，并返回一个包含这些模块的嵌套哈希结构。
// 说白了就是到处哈希树，挺方便的，不用手动去引了、
module.exports = requireDirectory(module)
