const KoaRouter = require("koa-router");
const controllers = require('../controllers/index.js');
const router = new KoaRouter();

// 下面这个 直接 function 表示不阻塞、直接执行、
router.get('/',(ctx, next) => {
	ctx.body = 'welcome to Rejiejay RESTful API'
})
// 测试
// router.get('/',controllers.测试.index)
/* --------------------------------- Home 首页前端部分 ----------------------------------------- */

// 获取 首页 Main 所有数据
router.get('/Home/getCode',controllers.Home.getCode);
router.get('/Home/getDesign',controllers.Home.getDesign);
router.get('/Home/getArticle',controllers.Home.getArticle);

/**
 * 点赞 阅读 + 1
 * @param {string} identify 
 * @param {string} code article design
 */
router.post('/Home/likePlus',controllers.Home.likePlus);
router.post('/Home/readPlus',controllers.Home.readPlus);

/**
 * 查看详情
 * @param {string} identify 
 */
router.post('/Home/getDetail',controllers.Home.getDetail);



/* --------------------------------- Home 首页后端部分 ----------------------------------------- */
// 上传图片
router.post('/Image/uploadImg',controllers.Image.uploadImg)

/**
 * 添加作品
 * @param {collection} string 数据库 'code' 'design' 'article'
 * @param {title}  string
 * @param {label}  string
 * @param {.....}  string	数据
 */
router.post('/Home/addWriting',controllers.Home.addWriting);
/**
 * 编辑作品
 * @param {collection} string 数据库 'code' 'design' 'article'
 * @param {title}  string
 * @param {label}  string
 * @param {.....}  string   数据
 */
router.post('/Home/editWriting',controllers.Home.editWriting);
/**
 * 删除作品
 * @param {identify} string 唯一标识ID
 */
router.post('/Home/deleteWriting',controllers.Home.deleteWriting);


/* --------------------------------- User 用户部分 ----------------------------------------- */
// 登陆
router.post('/User/login',controllers.User.login)
// Cookies 验证
router.get('/User/cookies',controllers.User.cookies)





module.exports = router