exports.ENVIRONMENT = process.env.NODE_ENV || 'development';

if (exports.ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

exports.config = {
  port: process.env.PORT,
  api: {
    brains: process.env.PLOTI_BRAINS_URL,
    ploti: process.env.PLOTI_BUSINESS_URL
  }

};
