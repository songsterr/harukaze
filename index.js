var _ = require('lodash');

var debug = require('./lib/debug');
var store = require('./lib/store');
var actions = require('./lib/actions');
var messages = require('./lib/messages');

module.exports = _.extend({}, debug, store, actions, messages);
