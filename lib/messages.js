require('es6-promise').polyfill();

var _ = require('underscore');
var Bacon = require('baconjs').Bacon;

var logger = require('./logger');

function message(name) {
	var message = {
		name: name,
		feed: new Bacon.Bus(),
		send: function (payload) {
			return new Promise(function (resolve, reject) {
				logger.logMessage(name, payload);
				message.feed.push(payload);
				resolve();
			});
		}
	};
	return message;
}

module.exports = {
	messages: function (ns, names) {
		var messages = {};
		_.each(names, function (name) {
			messages[name] = message(ns + '.' + name);
		});
		return messages;
	}
};
