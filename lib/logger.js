var debug = require('./debug').debug;

module.exports = {
	logActionStart: function (name, args) {
		if (!debug.enabled) { return; }
		if (!args.length) {
			console.group('ACTION %s', name);			
		} else {
			console.group('ACTION %s: %o', name, args);						
		}
	},

	logActionPromiseResult: function (name, promise) {
		if (!debug.enabled) { return; }
		promise.then(function(res) {
			console.log('[OK] %o', res);
			console.groupEnd();
		}, function(err) {
			console.log('[ERR] %o', err);
			console.groupEnd();
		});
	},

	logMessage: function (name, payload) {
		if (!debug.enabled) { return; }
		if (payload) {
			console.log('MESSAGE %s: %o', name, payload);
		} else {
			console.log('MESSAGE %s', name);		
		}
	}
};
