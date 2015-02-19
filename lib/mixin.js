'use strict';

var _ = require('lodash');
var React = require('react');

var Mixin = {
  wire: function(store, arg) {
    var component = this;
    var harukaze = this._harukaze = this._harukaze || {};
    var unsubscribers = harukaze.unsubscribers = harukaze.unsubscribers || [];
    var unsubscribe = null;
    
    if (_.isFunction(arg)) {
      unsubscribe = store.changes.onValue(arg);
    } else if (_.isArray(arg)) {
      unsubscribe = store.changes.onValue(function (output) {
        component.setState(_.pick(output, arg));
      })
    }
    
    unsubscribers.push(unsubscribe);
    return unsubscribe;
  },

  componentWillUnmount: function() {
    var harukaze = this._harukaze;
    if (harukaze) {
      var unsubscribers = harukaze.unsubscribers;
      if (unsubscribers) {
        _.each(unsubscribers, function (f) { f(); });
      }
    }  
  }
};

module.exports = Mixin;
