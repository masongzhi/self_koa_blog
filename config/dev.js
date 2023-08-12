const path = require('path');

module.exports = {
  application: 'self-koa_blog',
  root: path.resolve(__dirname, '..'),
  configFile: path.resolve(__dirname, __filename),
  isProd: false,
  database: {
    redis: {
      host: 'localhost',
      port: '6380',
    },
    mongoDebug: true,
    mongodb: [
      {
        name: 'mp',
        url: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/admin`,
        options: {},
      },
    ],
  },
  port: 4000,
};
