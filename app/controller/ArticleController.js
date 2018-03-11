const ArticleService = require('../service/ArticleService')

class ArticleController {
  static async getArticle (ctx) {
    const param = ctx.query
    const result = await ArticleService.getArticle(param)

    ctx.body = result
  }

  static async setArticle (ctx) {
    const param = ctx.request.body
    const result = await ArticleService.setArticle(param)

    ctx.body = result
  }
}

module.exports = ArticleController
