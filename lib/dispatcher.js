'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this.bus = new _baconjs2['default'].Bus();
    this.dirtyStores = [];
    this.dispatching = false;
  }

  _createClass(Dispatcher, [{
    key: '_pushChangesOnce',
    value: function _pushChangesOnce() {
      var stores = this.dirtyStores;
      this.dirtyStores = [];
      _.each(stores, function (store) {
        store.changes.push(store.output);
      });
    }
  }, {
    key: '_pushChanges',
    value: function _pushChanges() {
      if (!this.dirtyStores.length) {
        _logger2['default'].logNoDirtyStores();
        return;
      }
      var also = false;
      while (this.dirtyStores.length > 0) {
        _logger2['default'].logDirtyStores(this.dirtyStores, also);
        this._pushChangesOnce();
        also = true;
      }
    }
  }, {
    key: 'dispatch',
    value: function dispatch(type, payload) {
      var _this = this;

      if (this.dispatching) {
        return Promise.reject('Cascading dispatches are prohibited. Fix your flux.');
      }
      return new Promise(function (resolve) {
        _this.dispatching = true;
        _logger2['default'].logMessage(type, payload);
        try {
          _this.bus.push({ type: type, payload: payload });
          _this._pushChanges();
          resolve();
        } finally {
          _logger2['default'].logMessageEnd();
          _this.dispatching = false;
        }
      });
    }
  }, {
    key: 'input',
    value: function input(type) {
      return this.bus.filter(function (msg) {
        return msg.type === type;
      }).map('.payload');
    }
  }, {
    key: 'markStoreAsDirty',
    value: function markStoreAsDirty(store) {
      if (!_.contains(this.dirtyStores, store)) {
        this.dirtyStores.push(store);
      }
    }
  }]);

  return Dispatcher;
})();

exports['default'] = new Dispatcher();
module.exports = exports['default'];
//# sourceMappingURL=dispatcher.js.map