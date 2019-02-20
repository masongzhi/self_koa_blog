const responseFormatter = require('./middleware/ResponseFormatter');
const updateToken = require('./middleware/UpdateToken');
const { allow } = require('./middleware/AuthValidate');
const ArticleController = require('./controller/ArticleController');
const CommentController = require('./controller/CommentController');
const UserController = require('./controller/UserController');
const { Const } = require('./lib');

const router = require('koa-router')({
  prefix: Const.PREFIX,
});
router.use('/', updateToken, responseFormatter('^/api'));

// 需要权限接口
router.post('/article', allow('root'), ArticleController.setArticle);
router.delete('/article', allow('root'), ArticleController.delArticle);
router.put('/article', allow('root'), ArticleController.updateArticle);

// 增加喜欢和评论数
router.post('/article/addLC', ArticleController.addLC);
router.post('/article/subLC', ArticleController.subLC);

router.get('/comment/get', CommentController.get);
router.get('/comment/get/:id', CommentController.getById);
router.post('/comment/add', CommentController.add);
router.post('/comment/reply', CommentController.reply);

// 无需权限接口
router.post('/public/register', UserController.register);
router.post('/public/login', UserController.login);
router.get('/public/article', ArticleController.getArticles);
router.get('/public/article/:id', ArticleController.getArticle);

module.exports = router;
