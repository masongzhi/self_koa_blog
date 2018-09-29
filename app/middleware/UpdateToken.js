const { AppError, Logger, Const } = require('../lib');

module.exports = async (ctx, next) => {
  try {
    await next();
    if (ctx.cookies.get('token')) {
      ctx.cookies.set('token', ctx.cookies.get('token'), Const.TOKEN_CONFIG);
    }
  } catch (e) {
    Logger.info(e.message);
    throw new AppError(e.message);
  }
};
