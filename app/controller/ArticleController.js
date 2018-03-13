const ArticleService = require('../service/ArticleService')
const {Joi} = require('../lib')

class ArticleController {
  static async getArticle (ctx) {
    const param = ctx.query
    const result = await ArticleService.getArticle(param)

    ctx.body = result
  }

  static async setArticle (ctx) {
    const schema = {
      title: Joi.string().required(),
      content: Joi.string().required(),
      label: Joi.array().items(Joi.string()),
      time: Joi.number().strict()
    }
    const value = Joi.validate(ctx.request.body, schema)
    const result = await ArticleService.setArticle(value)

    ctx.body = result
  }
}

module.exports = ArticleController
