var debug = require('./debug').debug;

module.exports = {
	logAction: function (name, promise) {
		if (!debug.enabled) { return; }
		console.log('ACTION %s: BEGIN', name);
		promise.then(function(res) {
			console.info('ACTION %s: [OK] %o', name, res);
			console.info('ACTION %s: END', name);
		}, function(err) {
			console.error('ACTION %s: [ERR] %o', name, err);
			console.info('ACTION %s: END', name);
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
