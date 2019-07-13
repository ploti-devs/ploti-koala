const Koa = require('koa'),
  Router = require('koa-router'),
  bodyParser = require('koa-bodyparser'),
  cors = require('@koa/cors'),
  logger = require('./logger'),
  config = require('./config');

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
