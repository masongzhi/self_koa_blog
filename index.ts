const Koa = require('koa');
const http = require('http');
const app = new Koa();
const config = require('config');
const time = Date.now();
const port = config.get('port');
const bodyParser = require('koa-bodyparser');
const router = require('./app/router');
const { Logger, Const } = require('./app/lib');
const { validate } = require('./app/middleware/AuthValidate');

require('./config/initializer');

// jwt验证
app.use(
  validate({
    path: Const.VALIDATE_PATH,
    tokenSecret: Const.TOKEN_SECRET,
  })
);

app.use(bodyParser());
app.use(router.routes(), router.allowedMethods());

const server = http.createServer(app.callback());
server.listen(port);
Logger.info(` app star in ${process.env.NODE_ENV} env `);
Logger.info(` app star in ${(Date.now() - time) / 1000} s, listen on port ${port}`);
