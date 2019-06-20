const Koa = require('koa');
const Router = require('koa-router');
const logger = require('./logger');
const config = require('./config');

const PORT = config.port || 3000;
const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message || 'Oops';
    ctx.app.emit('error', err, ctx);
  }
});

const router = new Router();
const plotiRouter = new Router({
  prefix : '/ploti'
});
const brainsRouter = new Router({
  prefix: '/brains'
});

require('./routes')({ router })
require('./routes/ploti')({ plotiRouter });
require('./routes/brains')({ brainsRouter });

app.use(router.routes());
app.use(router.allowedMethods());

app.use(plotiRouter.routes());
app.use(plotiRouter.allowedMethods());

app.use(brainsRouter.routes());
app.use(brainsRouter.allowedMethods());


const server = app.listen(PORT);
logger.info(`KOALA RUNNING @ ${PORT}`);

module.exports = server;
