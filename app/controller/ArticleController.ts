import ArticleService from '../service/ArticleService';
import { Joi } from '../lib';

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
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await ArticleService.setArticle({ ...value, author: ctx.state.user });

    ctx.body = result;
  }

  static async delArticle(ctx) {
    const schema = {
      articleId: Joi.string()
        .length(24)
        .required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await ArticleService.delArticle(value);

    ctx.body = result;
  }

  static async updateArticle(ctx) {
    const schema = {
      articleId: Joi.string()
        .length(24)
        .required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      label: Joi.array().items(Joi.string()),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await ArticleService.updateArticle(value);

    ctx.body = result;
  }

  // L: likes, C: comments
  static async addLC(ctx) {
    const schema = {
      type: Joi.string()
        .only(['likes', 'comments'])
        .required(),
      articleId: Joi.string()
        .length(24)
        .required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await ArticleService.addLVC(value);

    ctx.body = result;
  }

  static async subLC(ctx) {
    const schema = {
      type: Joi.string()
        .only(['likes', 'comments'])
        .required(),
      articleId: Joi.string()
        .length(24)
        .required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await ArticleService.subLVC(value);

    ctx.body = result;
  }
}

export default ArticleController;
