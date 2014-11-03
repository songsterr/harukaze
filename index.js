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

	createAction: function (f) {
		var result = {
			feed: new Bacon.Bus(),
			perform: function () {
				var promise = f.apply(null, arguments);
				result.feed.plug(Bacon.fromPromise(promise));
				return promise;
			}
		};
		return result;
	}
};
