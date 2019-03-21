export default {
  TOKEN_SECRET: 'self_koa_blog',
  TOKEN_CONFIG: {
    path: '/', // 写cookie所在的路径
    maxAge: 30 * 60 * 1000, // cookie有效时长
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: true,
  },
  PREFIX: '/api/v1',
  VALIDATE_PATH: [/^\/api\/v1\/public/],
  NO_UPDATE_TOKEN_PATH: /^\/api\/v1\/public\/(login|register)/,
};
