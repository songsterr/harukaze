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
      unsubscribe = store.changes.onValue(output => {
        var values = _.map(arg, x => output[x]);
        var state = _.object(arg, values);
        component.setState(state);
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
        unsubscribers.forEach(f => f());
      }
    }  
  }
};

module.exports = Mixin;
