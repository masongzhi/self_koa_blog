const responseFormatter = require('./middleware/ResponseFormatter');
const ArticleController = require('./controller/ArticleController');

const router = require('koa-router')({
  prefix: '/api/v1',
});
router.use('/', responseFormatter('^/api'));

router.get('/article', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.post('/article', ArticleController.setArticle);
router.post('/article/addLVC', ArticleController.addLVC);
router.post('/article/subLVC', ArticleController.subLVC);

module.exports = router;
