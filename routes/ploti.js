const config = require('../config').config;
const logger = require('../logger');
const { getRequest } = require('../helpers');

const PLOTI = config.api.ploti;

module.exports = ({ plotiRouter }) => {
  const url = `${PLOTI}/api/status`;
  return plotiRouter.get('/api/status', async (ctx, next) => {
    try {
      const response = await getRequest(ctx, url);
      logger.info(`Request from ${url}: ${response}`);
      ctx.body = response;
    } catch (err) {
      logger.error(err.message);
      return ctx.response = {...err};
    };
  });
};
