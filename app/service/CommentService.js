const { Comment, User } = require('../model');
const { getCurrentTimestamp } = require('../lib/DateUtil');

class CommentService {
  async add(param) {
    await Comment.create(param);
    return 'success';
  }

  async reply(param) {
    const replyAuthor = await User.findById(param.replyUserId);
    const comment = await Comment.findById(param.commentId);
    await Comment.findByIdAndUpdate(param.commentId, {
      childComments: [
        ...comment.childComments,
        {
          ...param,
          createdTime: getCurrentTimestamp(),
          replyAuthor,
        },
      ],
    });
    return 'success';
  }
}

module.exports = new CommentService();
