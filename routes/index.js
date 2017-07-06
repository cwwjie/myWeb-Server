const KoaRouter = require("koa-router");
const controllers = require('../controllers/index.js');
const router = new KoaRouter();

// 下面这个 直接 function 表示不阻塞、直接执行、
router.get('/',(ctx, next) => {
	ctx.body = 'welcome to Rejiejay RESTful API'
})
/* --------------------------------- Home 首页前端部分 ----------------------------------------- */
// 获取 轮播图 所有数据
router.get('/Home/getscrollPicture',controllers.Home.getscrollPicture)
// 获取 展示区 所有数据
router.get('/Home/getareaDisplay',controllers.Home.getareaDisplay)

/* --------------------------------- User 用户部分 ----------------------------------------- */
// 登陆
router.post('/User/login',controllers.User.login)





module.exports = router