const { Article } = require('../model');
const AppError = require('../lib/AppError');

class ArticleService {
  async getArticles({ page = 1, limit = 10 }) {
    let query = {};
    const select = 'time likes views title summary label comments';
    const options = { sort: '-_id', leanWithId: true, page, limit, select };
    const result = await Article.paginate(query, options);
    return result;
  }

  async getArticle({ id }) {
    return await Article.findOne({ _id: id });
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

  async addLVC({ id, type }) {
    const data = await Article.findById(id);
    await Article.updateOne({ _id: id }, { [type]: ++data[type] });
    return 'success';
  }

  async subLVC({ id, type }) {
    const data = await Article.findById(id);
    await Article.updateOne({ _id: id }, { [type]: --data[type] });
    return 'success';
  }
}

module.exports = new ArticleService();
