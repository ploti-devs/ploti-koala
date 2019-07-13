const Util = require('util'),
  config = require('../config').config,
  logger = require('../logger'),
  { getRequest, postRequest } = require('../helpers'),
  koaBody = require('koa-body'),
  PLOTI = config.api.ploti;

module.exports = ({ plotiRouter }) => {

  plotiRouter.post('/companies',async (ctx, next) => {
    const companiesURL = `${PLOTI}/api/companies`;
    try {
      const response = await postRequest(ctx, companiesURL);
      logger.info(`Request to ${companiesURL}:\n ${Util.inspect(response, {depth:null})}`);
      return ctx.body = response;
    } catch (err) {
      ctx.err = err.message;
      return next();
    };
  });

  plotiRouter.post('/users', async (ctx, next) => {
    const usersURL = `${PLOTI}/api/users`;
    try {
      const response = await postRequest(ctx, usersURL);
      logger.info(`Request to ${usersURL}:\n ${Util.inspect(response)}`);
      ctx.body = response;
      return next();
    } catch (err) {
      ctx.err = err.message;
      return next();
    };
  });

};
