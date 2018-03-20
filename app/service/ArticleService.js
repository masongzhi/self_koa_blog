const {Article}  = require('../model')

class ArticleService {
  async getArticles ({page = 1, limit = 10}) {
    let query = {}
    let options = {sort: '-_id', leanWithId: true, page, limit}
    const result = await Article.paginate(query, options)
    return result
  }
  async getArticle ({id}) {
    return await Article.findOne({_id: id})
  }
  async setArticle (param) {
    await Article.create({
      ...param,
      time: new Date().getTime()
    })
    return 'success'
  }
}

module.exports = new ArticleService()
