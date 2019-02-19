const CommentService = require('../service/CommentService');
const { Joi } = require('../lib');

class CommentController {
  static async add(ctx) {
    const schema = {
      articleId: Joi.string()
        .length(24)
        .required(),
      content: Joi.string().required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await CommentService.add({ ...value, author: ctx.state.user });

    ctx.body = result;
  }
  static async reply(ctx) {
    const schema = {
      commentId: Joi.string()
        .length(24)
        .required(),
      content: Joi.string().required(),
      replyUserId: Joi.string()
        .length(24)
        .required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await CommentService.reply({ ...value, author: ctx.state.user });

    ctx.body = result;
  }
}

module.exports = CommentController;
