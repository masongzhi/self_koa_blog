const Koa = require('koa');
const http = require('http');
const app = new Koa();
const router = require('./app/router');

app.use(router.routes(), router.allowedMethods());

const server = http.createServer(app.callback());
server.listen(3002);
