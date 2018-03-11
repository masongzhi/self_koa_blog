const {Article}  = require('../model')

class ArticleService {
  async getArticle ({page = 1, limit = 10}) {
    let query = {}
    let options = {sort: '-_id', lean: true, leanWithId: true, page, limit}
    const result = await Article.paginate(query, options)
    return result
  }
  async setArticle (param) {
    await Article.create(param)
    return 'success'
  }
}

module.exports = new ArticleService()
