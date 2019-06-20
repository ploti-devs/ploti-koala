const pino = require('pino');

const logger = pino({
  base: null,
  prettyPrint: { colorize: true }
});

module.exports = logger;
