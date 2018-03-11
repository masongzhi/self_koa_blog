const Koa = require('koa');
const http = require('http');
const app = new Koa();
const router = require('./app/router');
const config = require('config')
const Logger = require('./app/lib/Logger')
const time = Date.now()
const port = config.get('port')

require('./config/initializer')

app.use(router.routes(), router.allowedMethods());

const server = http.createServer(app.callback());
server.listen(port);
Logger.info(` app star in ${process.env.NODE_ENV} env `)
Logger.info(` app star in ${(Date.now() - time) / 1000} s, listen on port ${port}`)
