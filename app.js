const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const logger = require('./logger');
const config = require('./config');

const PORT = config.port || 3000;
const app = new Koa();


const router = new Router();

const plotiRouter = new Router({
  prefix : '/ploti'
});
const brainsRouter = new Router({
  prefix: '/brains'
});

require('./routes/ploti')({ plotiRouter });
require('./routes/brains')({ brainsRouter });


app
  .use(bodyParser())
  .use(cors())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message || 'Oops';
      ctx.app.emit('error', err, ctx);
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .use(plotiRouter.routes())
  .use(plotiRouter.allowedMethods())
  .use(brainsRouter.routes())
  .use(brainsRouter.allowedMethods())


const server = app.listen(PORT);
logger.info(`KOALA RUNNING @ ${PORT}`);

module.exports = server;
