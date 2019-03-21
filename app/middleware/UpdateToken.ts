const { AppError, Logger, Const } = require('../lib');

module.exports = async (ctx, next) => {
  try {
    await next();
    // 如果是登录或者注册，不应该更新之前的token
    if (ctx.url.match(Const.NO_UPDATE_TOKEN_PATH)) return;
    if (ctx.body && ctx.body.code === 0 && ctx.cookies.get('token')) {
      ctx.cookies.set('token', ctx.cookies.get('token'), Const.TOKEN_CONFIG);
    }
  } catch (e) {
    Logger.info(e.message);
    throw new AppError(e.message);
  }
};
