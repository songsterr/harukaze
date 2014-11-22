var dispatcher = require('./dispatcher');

function message(type) {
  return dispatcher.dispatch.bind(dispatcher, type);
}

module.exports = {
  message: message
};
