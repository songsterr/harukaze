/* eslint no-console:0 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var Logger = (function () {
  function Logger() {
    _classCallCheck(this, Logger);

    this.enabled = false;
  }

  _createClass(Logger, [{
    key: 'enable',
    value: function enable() {
      this.enabled = true;
    }
  }, {
    key: 'logActionStart',
    value: function logActionStart(name, args) {
      if (!this.enabled) {
        return;
      }
      if (!args.length) {
        console.group('ACTION %s', name);
      } else {
        console.group('ACTION %s: %o', name, args);
      }
    }
  }, {
    key: 'logActionPromiseResult',
    value: function logActionPromiseResult(name, promise) {
      if (!this.enabled) {
        return;
      }
      promise.then(function (res) {
        console.log('[OK] %o', res);
        console.groupEnd();
      }, function (err) {
        if (err.stack) {
          console.log('[ERR, RETHROWN] %s', err);
          process.nextTick(function rethrow() {
            throw err;
          });
        } else {
          console.log('[ERR] %o', err);
        }
        console.groupEnd();
      });
    }
  }, {
    key: 'logMessage',
    value: function logMessage(name, payload) {
      if (!this.enabled) {
        return;
      }
      if (payload) {
        console.group('MESSAGE %s: %o', name, payload);
      } else {
        console.group('MESSAGE %s', name);
      }
    }
  }, {
    key: 'logDirtyStores',
    value: function logDirtyStores(dirtyStores, also) {
      if (!this.enabled) {
        return;
      }
      if (dirtyStores.length) {
        console.log('%sCHANGED STORES: %s', also ? 'ALSO ' : '', _.pluck(dirtyStores, 'displayName').join(', '));
      } else {
        console.log('NO STORES CHANGED.');
      }
    }
  }, {
    key: 'logNoDirtyStores',
    value: function logNoDirtyStores() {
      if (!this.enabled) {
        return;
      }
      console.log('NO STORES CHANGED.');
    }
  }, {
    key: 'logMessageEnd',
    value: function logMessageEnd() {
      if (!this.enabled) {
        return;
      }
      console.groupEnd();
    }
  }]);

  return Logger;
})();

exports['default'] = new Logger();
module.exports = exports['default'];
//# sourceMappingURL=Logger.js.map