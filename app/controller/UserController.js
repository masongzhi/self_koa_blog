const UserService = require('../service/UserService');
const { Joi, Const } = require('../lib');
const jwt = require('jsonwebtoken');

function genToken(user) {
  const jwtdata = {
    username: user.username,
    // email: user.email,
    role: user.role,
  };
  const token = jwt.sign(jwtdata, Const.TOKEN_SECRET, { expiresIn: '365d' });
  return token;
}

function setTokenToCookie(ctx, token) {
  ctx.cookies.set('token', token, {
    // domain: '.kaolalicai.cn',  // 写cookie所在的域名
    path: '/', // 写cookie所在的路径
    maxAge: 30 * 60 * 1000, // cookie有效时长
    // expires: moment().add(30,''),  // cookie失效时间
    httpOnly: true, // 是否只用于http请求中获取
    // overwrite: true  // 是否允许重写
  });
}

class ArticleController {
  static async register(ctx) {
    const schema = {
      username: Joi.string().required(),
      password: Joi.string().required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const result = await UserService.register(value);

    ctx.body = result;
  }
  static async login(ctx) {
    const schema = {
      username: Joi.string().required(),
      password: Joi.string().required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const user = await UserService.login(value);

    const token = genToken(user);
    await setTokenToCookie(ctx, token);
    ctx.body = {
      user,
      token,
    };
  }
}

module.exports = ArticleController;
