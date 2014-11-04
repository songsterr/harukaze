var _ = require('underscore');

var logger = require('./logger');

function action(name, fn) {
	var action = {
		name: name,
		perform: function () {
			var promise = fn.apply(action, arguments);
			logger.logAction(name, promise);
			return promise;
		}
	};
	return action;
}

module.exports = {
	actions: function (ns, spec) {
		var actions = {};
		_.each(_.keys(spec), function (key) {
			actions[key] = action(ns + '.' + key, spec[key]);
		});
		return actions;
	}
};
