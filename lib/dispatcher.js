var Bacon = require('baconjs').Bacon;
var logger = require('./logger');
var bus = new Bacon.Bus();

var dispatch = function (type, payload) {
	logger.logMessage(type, payload);
	bus.push({
    type: type, 
    payload: payload
  });    
}

var getFeed = function (type) {
  return bus.filter(function (x) {
	  return x.type === type;
	}).map('.payload');
};

module.exports = {
  dispatch: dispatch,
  getFeed: getFeed
};
