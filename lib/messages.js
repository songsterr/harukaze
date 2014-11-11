require('es6-promise').polyfill();
var _ = require('underscore');
var Bacon = require('baconjs').Bacon;

var logger = require('./logger');

function message(type) {
	var bus = new Bacon.Bus();

	function push(payload) {
		return new Promise(function (resolve, reject) {
			logger.logMessage(type, payload);
			bus.push(payload);
			resolve();
		});
	}

	push.feed = bus;
	return push;
}

module.exports = {
	message: message
};
