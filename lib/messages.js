var Promise = require('es6-promise').Promise;

var dispatcher = require('./dispatcher');

function message(type) {
  function push(payload) {
    return new Promise(function (resolve, reject) {
      dispatcher.dispatch(type, payload);
      resolve();
    });
  }
  push.feed = dispatcher.getFeed(type);
  return push;
}

module.exports = {
  message: message
};
