const UserService = require('../service/UserService');
const { Joi, Const } = require('../lib');
const jwt = require('jsonwebtoken');

function genToken(user) {
  const jwtdata = {
    username: user.username,
    // email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
  const token = jwt.sign(jwtdata, Const.TOKEN_SECRET, { expiresIn: '365d' });
  return token;
}

function setTokenToCookie(ctx, token) {
  ctx.cookies.set('token', token, Const.TOKEN_CONFIG);
}

class ArticleController {
  static async register(ctx) {
    const schema = {
      email: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const user = await UserService.register(value);

    const token = genToken(user);
    await setTokenToCookie(ctx, token);
    ctx.body = {
      user,
      token,
    };
  }
  static async login(ctx) {
    const schema = {
      username: Joi.string().required(),
      password: Joi.string().required(),
    };
    const value = Joi.validate(ctx.request.body, schema);
    const user = await UserService.login(value);

    const token = genToken(user);
    setTokenToCookie(ctx, token);
    ctx.body = {
      user,
      token,
    };
  }

  // 用于masongzhi.github.io/react-image-crop-upload演示
  static async testUpload(ctx) {}

  static async getQiniuToken(ctx) {
    const token = await UserService.getQiniuToken();
    ctx.body = { token };
  }
}

module.exports = ArticleController;
