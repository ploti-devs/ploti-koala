const request = require('axios'),
  { get, assign } = require('lodash'),
  logger = require('../logger');

exports.getRequest = async (ctx,endpoint) => {
  const requestOptions = {
    method: 'get',
    url: endpoint,
    query: get(ctx, ['request', 'query'])
  };
  try {
    const response = await request(requestOptions);
    const { data } = response;
    return data;
  } catch(err) {
    ctx.throw(err.response.status, {
      data: {
        error: err.response.statusText,
        message: err.data
      }
    });
  }
};

exports.postRequest = async (ctx, endpoint) => {
  const requestOptions = {
    method: 'post',
    url: endpoint,
    headers: ctx.headers,
    data: ctx.request.body
  };
  try {
    const response = await request(requestOptions);
    const { data } = response;
    return data;
  } catch(err) {
    ctx.throw(err.response.status, {
      data: {
        error: err.response.statusText,
        message: err.data
      }
    });
  }

};
