const path = require('path')

module.exports = {
  application: 'self-koa_blog',
  root: path.resolve(__dirname, '..'),
  configFile: path.resolve(__dirname, __filename),
  isProd: true,
  database: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD
    },
    mongoDebug: false,
    mongodb: [
      {
        name: 'blog',
        url: process.env.MONGO_URL,
        options: {}
      }
    ]
  },
  port: 3002
}
