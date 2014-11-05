var Promise = require('es6-promise').Promise;
var _ = require('underscore');

var logger = require('./logger');

var isDispatching = false;

function action(name, fn) {
	return function () {
		if (isDispatching) {
			throw new Error('You must not nest actions. Fix your flux.');
		}
		isDispatching = true;
		try {
			logger.logActionStart(name, arguments);
			var promise = fn.apply(action, arguments);
			logger.logActionPromiseResult(name, promise);			
		} finally {
			isDispatching = false;
		}
		return promise;		
	};
}

module.exports = {
	action: action
};
