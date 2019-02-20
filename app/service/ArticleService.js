const { Article } = require('../model');
// const AppError = require('../lib/AppError');

class ArticleService {
  async getArticles({ page = 1, limit = 10 }) {
    let query = {};
    const select = 'time likes views title summary label comments';
    const options = { sort: '-_id', leanWithId: true, page, limit, select };
    const result = await Article.paginate(query, options);
    return result;
  }

  async getArticle({ id }) {
    return await Article.findById(id);
  }

  async setArticle(param) {
    const summary = param.content && param.content.slice(0, 100);
    await Article.create({
      ...param,
      summary,
      time: new Date().getTime(),
    });
    return 'success';
  }

  async delArticle({ articleId }) {
    await Article.findByIdAndDelete(articleId);
    return 'success';
  }

  async updateArticle(param) {
    await Article.findByIdAndUpdate(param.articleId, param);
    return 'success';
  }

  async addLVC({ articleId, type }) {
    const data = await Article.findById(articleId);
    await Article.updateOne({ _id: articleId }, { [type]: ++data[type] });
    return 'success';
  }

  async subLVC({ articleId, type }) {
    const data = await Article.findById(articleId);
    await Article.updateOne({ _id: articleId }, { [type]: --data[type] });
    return 'success';
  }
}

module.exports = new ArticleService();
