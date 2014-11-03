var _ = require('underscore');
var Bacon = require('baconjs').Bacon;

function log(name, promise) {
	promise.then(function(res) {
		console.info('[OKAY ]: %s: %o', name, res);
	}, function(err) {
		console.error('[ERROR]: %s: $o', name, err);
	});
}

function action(name, fn) {
	var action = {
		name: name,
		feed: new Bacon.Bus(),
		perform: function () {
			var promise = fn.apply(action, arguments);
			action.feed.plug(Bacon.fromPromise(promise));
			if (Harukaze.debug) { 
				log(name, promise);
			}
			return promise;
		}
	};
	return action;
}

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
	}
};

module.exports = Harukaze;
