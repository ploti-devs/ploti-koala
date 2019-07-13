const Util = require('util');
const config = require('../config').config;
const logger = require('../logger');
const { getRequest, postRequest } = require('../helpers');
const koaBody = require('koa-body');
const PLOTI = config.api.ploti;

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
