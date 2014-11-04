var debug = require('./debug').debug;

module.exports = {
	logAction: function (name, promise) {
		if (!debug.enabled) { return; }
		promise.then(function(res) {
			console.info('ACTION %s: [OK] %o', name, res);
		}, function(err) {
			console.error('ACTION %s: [ERR] $o', name, err);
		});
	},

	logMessage: function (name, payload) {
		if (!debug.enabled) { return; }
		if (payload) {
			console.info('MESSAGE %s: %o', name, payload);
		} else {
			console.info('MESSAGE %s', name);		
		}
	}
};
