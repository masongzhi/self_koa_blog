const ArticleService = require('../service/ArticleService');
const { Joi } = require('../lib');

class ArticleController {
  static async getArticles(ctx) {
    const schema = {
      page: Joi.number(),
      limit: Joi.number(),
    };
    const value = Joi.validate(ctx.query, schema);
    const result = await ArticleService.getArticles(value);

    ctx.body = result;
  }

  static async getArticle(ctx) {
    const result = await ArticleService.getArticle(ctx.params);

    ctx.body = result;
  }

  static async setArticle(ctx) {
    const schema = {
      title: Joi.string().required(),
      content: Joi.string().required(),
      label: Joi.array().items(Joi.string()),
      time: Joi.number().strict(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await ArticleService.setArticle(value);

    ctx.body = result;
  }

  // L: likes, V: views, C: comments
  static async addLVC(ctx) {
    const schema = {
      type: Joi.string()
        .only(['likes', 'views', 'comments'])
        .required(),
      id: Joi.string()
        .length(24)
        .required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await ArticleService.addLVC(value);

    ctx.body = result;
  }

  static async subLVC(ctx) {
    const schema = {
      type: Joi.string()
        .only(['likes', 'views', 'comments'])
        .required(),
      id: Joi.string()
        .length(24)
        .required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await ArticleService.subLVC(value);

    ctx.body = result;
  }
}

module.exports = ArticleController;
