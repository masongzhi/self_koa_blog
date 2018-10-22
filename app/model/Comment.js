const BaseModel = require('./BaseModel');

class Comment extends BaseModel {
  constructor() {
    super();
    this.name = 'comment';
    this.schema = {
      articleId: { type: String, required: true },
      content: { type: String, required: true },
      user: { type: Object, required: true },
    };
  }
}

module.exports = new Comment().init();
