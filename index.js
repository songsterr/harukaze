require('es6-promise').polyfill();

var _ = require('underscore');
var Bacon = require('baconjs').Bacon;

var Harukaze = {
	debug: false,

	store: function (spec) {
		var result = {};
		_.each(_.keys(spec), function (key) {
			result[key] = _.isFunction(spec[key]) ? spec[key]() : spec[key];
		});
		return result;
	},

	actions: function (ns, spec) {
		var actions = {};
		_.each(_.keys(spec), function (key) {
			actions[key] = action(ns + '.' + key, spec[key]);
		});
		return actions;
	},

	messages: function (ns, names) {
		var messages = {};
		_.each(names, function (name) {
			messages[name] = message(ns + '.' + name);
		});
		return messages;
	}

};

module.exports = Harukaze;


function logAction(name, promise) {
	if (!Harukaze.debug) { return; }
	promise.then(function(res) {
		console.info('ACTION %s: [OK] %o', name, res);
	}, function(err) {
		console.error('ACTION %s: [ERR] $o', name, err);
	});
}

function logMessage(name, payload) {
	if (!Harukaze.debug) { return; }
	if (payload) {
		console.info('MESSAGE %s: %o', name, payload);
	} else {
		console.info('MESSAGE %s', name);		
	}
}

function action(name, fn) {
	var action = {
		name: name,
		perform: function () {
			var promise = fn.apply(action, arguments);
			logAction(name, promise);
			return promise;
		}
	};
	return action;
}

function message(name) {
	var message = {
		name: name,
		feed: new Bacon.Bus(),
		send: function (payload) {
			return new Promise(function (resolve, reject) {
				logMessage(name, payload);
				message.feed.push(payload);
				resolve();
			});
		}
	};
	return message;
}
