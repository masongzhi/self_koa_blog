const { Comment, User } = require('../model');
const { getCurrentTimestamp } = require('../lib/DateUtil');

class CommentService {
  async get(param) {
    const data = await Comment.find({ articleId: param.articleId });
    return data;
  }

  async getById(param) {
    const data = await Comment.findById(param.id);
    return data;
  }

  async add(param) {
    await Comment.create(param);
    return 'success';
  }

  async reply(param) {
    const comment = await Comment.findById(param.commentId);
    await Comment.findByIdAndUpdate(param.commentId, {
      childComments: [
        ...comment.childComments,
        {
          ...param,
          createdTime: getCurrentTimestamp(),
        },
      ],
    });
    return 'success';
  }
}

module.exports = new CommentService();
