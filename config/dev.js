const path = require('path')

module.exports = {
  application: 'self-koa_blog',
  root: path.resolve(__dirname, '..'),
  configFile: path.resolve(__dirname, __filename),
  isProd: false,
  database: {
    redis: {
      host: 'localhost',
      port: '6379'
    },
    mongoDebug: true,
    mongodb: [
      {
        name: 'blog',
        url: 'mongodb://localhost:27017/blog',
        options: {}
      }
    ]
  },
  port: 3002
}
