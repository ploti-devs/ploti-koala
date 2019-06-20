const request = require('request-promise-native');
const { get, assign } = require('lodash');
const logger = require('../logger');

exports.getRequest = (ctx,endpoint) => {
  const requestOptions = {
    // headers: get(ctx, ['request','header']), // to do => check why this headers break everything ._.
    method: get(ctx, ['request', 'method']),
    query: get(ctx, ['request', 'query']),
    url: endpoint
  };
  return request(requestOptions).then(res => {
    const response = assign(JSON.parse(res), {status: 200});
    return response;
  })
  .catch(err => Promise.reject(err));
};
