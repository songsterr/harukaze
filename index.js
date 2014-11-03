var _ = require('underscore');
var Bacon = require('baconjs').Bacon;

module.exports = {
	createStore: function(spec) {
		var result = {};
		_.each(_.keys(spec), function (key) {
			result[key] = _.isFunction(spec[key]) ? spec[key]() : spec[key];
		});
		return result;
	},

	createAction: function (spec) {
		var base = {};
		var action = {
			feed: new Bacon.Bus(),
			perform: function () {
				var promise = spec.perform.apply(base, arguments);
				action.feed.plug(Bacon.fromPromise(promise));
				return promise;
			}
		};
		return _.extend(base, spec, action);
	}
};
