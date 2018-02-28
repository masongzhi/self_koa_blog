const router = require('koa-router')({
  prefix: '/api/v1'
});
router.get('/test', (ctx) => {
  ctx.body = 'success'
});
module.exports = router;
