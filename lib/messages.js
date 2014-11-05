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
				bus.push({ type: type, payload: payload });
			} finally {
				isDispatching = false;
			}
			resolve();
		});
	}

	function isRequestedType(message) {
		return message.type == type;
	}

	push.type = type;
	push.feed = bus.filter(isRequestedType).map('.payload');
	return push;
}

module.exports = {
	message: message
};
