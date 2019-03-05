const BaseModel = require('./BaseModel');

class Article extends BaseModel {
  constructor() {
    super();
    this.name = 'article';
    this.schema = {
      title: { type: String, required: true },
      content: { type: String, required: true },
      summary: { type: String, required: true },
      label: { type: Array }, // 标签
      time: { type: Number, required: true },
      likes: { type: Number, default: 0 },
      views: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      author: { type: Object, required: true },
    };
  }
}

module.exports = new Article().init();
