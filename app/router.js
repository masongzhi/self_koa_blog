const responseFormatter = require('./middleware/ResponseFormatter');
const updateToken = require('./middleware/UpdateToken');
const { allow } = require('./middleware/AuthValidate');
const ArticleController = require('./controller/ArticleController');
const UserController = require('./controller/UserController');

const router = require('koa-router')({
  prefix: '/api/v1',
});
router.use('/', updateToken, responseFormatter('^/api'));

// 需要权限接口
router.post('/article', allow('root'), ArticleController.setArticle);
// 无需权限接口
router.post('/public/register', UserController.register);
router.post('/public/login', UserController.login);
router.get('/public/article', ArticleController.getArticles);
router.get('/public/article/:id', ArticleController.getArticle);
router.post('/public/article/addLVC', ArticleController.addLVC);
router.post('/public/article/subLVC', ArticleController.subLVC);

module.exports = router;
