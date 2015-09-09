var Promise = require('bluebird');
var request = require('request');

module.exports = function withCredentials(options) {
  options.headers = {
    Accept: 'application/vnd.snap-ci.com.v1+json'
  };

  return new Promise(function(fullfill, reject) {
    request(options, function(err, response, body) {
      if(err) {
        return reject(err);
      }
      // console.log('[DEBUG] ', body);
      console.log('STATUS CODE: ', response.statusCode);
      response.statusCode >= 200 && response.statusCode <= 299 ? fullfill(body ? JSON.parse(body) : null) : reject({statusCode: response.statusCode});
    });
  });
};