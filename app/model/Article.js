const BaseModel = require('./BaseModel')

class Article extends BaseModel {
  constructor () {
    super()
    this.name = 'article'
    this.db = 'blog'
    this.schema = {
      title: { type: String, required: true },
      content: { type: String, required: true },
      label: { type: Array }, // 标签
      time: { type: Number, required: true }
    }
  }
}

module.exports = new Article().init()
