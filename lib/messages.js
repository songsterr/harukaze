require('es6-promise').polyfill();
var _ = require('underscore');
var Bacon = require('baconjs').Bacon;

var logger = require('./logger');

var isDispatching = false;

function message(type) {
	var bus = new Bacon.Bus();

	function push(payload) {
		return new Promise(function (resolve, reject) {
			if (isDispatching) {
				throw new Error('You must not nest message dispatches. Fix your flux.');
			}
			isDispatching = true;
			try {
				logger.logMessage(type, payload);
				bus.push(payload);
			} finally {
				isDispatching = false;
			}
			resolve();
		});
	}

	push.feed = bus;
	return push;
}

module.exports = {
	message: message
};
