exports.ENVIRONMENT = process.env.NODE_ENV || 'development';

if (exports.ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

exports.config = {
  port: process.env.PORT
};
