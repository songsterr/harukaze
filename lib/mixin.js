'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var Mixin = {
  wire: function wire(store, arg) {
    var component = this;
    var harukaze = this._harukaze = this._harukaze || {};
    var unsubscribers = harukaze.unsubscribers = harukaze.unsubscribers || [];
    var unsubscribe = null;

    if (_.isFunction(arg)) {
      unsubscribe = store.changes.onValue(arg);
    } else if (_.isArray(arg)) {
      unsubscribe = store.changes.onValue(function (output) {
        return component.setState(_.pick(output, arg));
      });
    }

    unsubscribers.push(unsubscribe);
    return unsubscribe;
  },

  componentWillUnmount: function componentWillUnmount() {
    var harukaze = this._harukaze;
    if (harukaze) {
      var unsubscribers = harukaze.unsubscribers;
      if (unsubscribers) {
        _.each(unsubscribers, function (fn) {
          return fn();
        });
      }
    }
  }
};

exports['default'] = Mixin;
module.exports = exports['default'];
//# sourceMappingURL=mixin.js.map