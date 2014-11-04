var debug = require('./debug').debug;

module.exports = {
	logActionStart: function (name) {
		if (!debug.enabled) { return; }
		console.log('BEGIN ACTION %s', name);
	},

	logActionPromiseResult: function (name, promise) {
		if (!debug.enabled) { return; }
		promise.then(function(res) {
			console.log('  RESULT: [OK] %o', res);
			console.log('END ACTION');
		}, function(err) {
			console.log('  RESULT: [ERR] %o', err);
			console.log('END ACTION');
		});
	},

	logMessage: function (name, payload) {
		if (!debug.enabled) { return; }
		if (payload) {
			console.log('  MESSAGE %s: %o', name, payload);
		} else {
			console.log('  MESSAGE %s', name);		
		}
	}
};
