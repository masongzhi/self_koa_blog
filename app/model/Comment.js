const BaseModel = require('./BaseModel');

class Comment extends BaseModel {
  constructor() {
    super();
    this.name = 'comment';
    this.schema = {
      articleId: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: Object, required: true },
      childComments: [
        {
          commentId: { type: String, required: true },
          content: { type: String, required: true },
          replyAuthor: { type: Object, required: true },
          createdTime: { type: Number, required: true },
          author: { type: Object, required: true },
        },
      ],
    };
  }
}

module.exports = new Comment().init();
