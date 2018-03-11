const responseFormatter = require('./middleware/ResponseFormatter')
const ArticleController = require('./controller/ArticleController')

const router = require('koa-router')({
  prefix: '/api/v1'
});
router.use('/', responseFormatter('^/api'))

router.get('/article', ArticleController.getArticle);
router.post('/article', ArticleController.setArticle);

module.exports = router;
