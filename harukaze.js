var _ = require('lodash');

var debug = require('./lib/debug');
var store = require('./lib/store');
var actions = require('./lib/actions');
var messages = require('./lib/messages');
var mixin = require('./lib/mixin');

module.exports = _.extend({}, debug, store, actions, messages, {
  Mixin: mixin
});
