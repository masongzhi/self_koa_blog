const Logger = require('../lib/Logger');
const jwt = require('koa-jwt');
const Const = require('../lib/Constant');

module.exports = function(path) {
  const auth = jwt({ secret: Const.TOKEN_SECRET, cookie: 'token' }).unless({
    path,
  });
  return async (ctx, next) => {
    try {
      await auth(ctx, async () => {
        ctx.cookies.set('token', ctx.cookies.get('token'), {
          // domain: '.kaolalicai.cn',  // 写cookie所在的域名
          path: '/', // 写cookie所在的路径
          maxAge: 30 * 60 * 1000, // cookie有效时长
          // expires: moment().add(30,''),  // cookie失效时间
          httpOnly: true, // 是否只用于http请求中获取
          // overwrite: true  // 是否允许重写
        });
        await next();
      });
    } catch (e) {
      Logger.info('err', e.message);
    }
  };
};
