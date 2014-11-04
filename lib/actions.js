var _ = require('underscore');

var logger = require('./logger');

function action(name, fn) {
	return function () {
		var promise = fn.apply(action, arguments);
		logger.logAction(name, promise);
		return promise;		
	};
}

module.exports = {
	action: action
};
