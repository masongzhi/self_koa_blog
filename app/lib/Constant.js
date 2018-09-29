module.exports = {
  TOKEN_SECRET: 'self_koa_blog',
  TOKEN_CONFIG: {
    path: '/', // 写cookie所在的路径
    maxAge: 30 * 60 * 1000, // cookie有效时长
    httpOnly: true, // 是否只用于http请求中获取
  },
};
