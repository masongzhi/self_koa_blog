const jwt = require('koa-jwt');
const { Joi, Logger, Const } = require('../lib');

module.exports = {
  validate: function({ tokenSecret, path }) {
    const auth = jwt({ secret: tokenSecret, cookie: 'token' }).unless({
      path,
    });
    return async (ctx, next) => {
      try {
        await auth(ctx, async () => {
          ctx.cookies.set('token', ctx.cookies.get('token'), Const.TOKEN_CONFIG);
          await next();
        });
      } catch (e) {
        Logger.info('err', e.message);
        // 不使用ctx.throw，前端不好统一处理
        ctx.body = {
          code: 3,
          message: '请登录后再进行操作',
        };
        // ctx.throw(401, '请登录后再进行操作')
      }
    };
  },
  allow: function(...roles) {
    Joi.array()
      .items(Joi.string())
      .validate(roles);
    return async function(ctx, next) {
      if (ctx.state.user) {
        const role = ctx.state.user.role;
        Logger.debug('current role ', role);
        if (!roles.includes(role)) ctx.throw(401, '该用户没有权限执行此操作');
      }
      await next();
    };
  },
};
