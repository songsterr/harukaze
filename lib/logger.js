/* eslint no-console:0 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.enableLogging = enableLogging;
exports.logActionStart = logActionStart;
exports.logActionPromiseResult = logActionPromiseResult;
exports.logMessage = logMessage;
exports.logDirtyStores = logDirtyStores;
exports.logNoDirtyStores = logNoDirtyStores;
exports.logMessageEnd = logMessageEnd;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var isLoggingEnabled = false;

function enableLogging() {
  isLoggingEnabled = true;
}

function logActionStart(name, args) {
  if (!isLoggingEnabled) {
    return;
  }
  if (!args.length) {
    console.group('ACTION %s', name);
  } else {
    console.group('ACTION %s: %o', name, args);
  }
}

function logActionPromiseResult(name, promise) {
  if (!isLoggingEnabled) {
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

function logMessage(name, payload) {
  if (!isLoggingEnabled) {
    return;
  }
  if (payload) {
    console.group('MESSAGE %s: %o', name, payload);
  } else {
    console.group('MESSAGE %s', name);
  }
}

function logDirtyStores(dirtyStores, also) {
  if (!isLoggingEnabled) {
    return;
  }
  if (dirtyStores.length) {
    console.log('%sCHANGED STORES: %s', also ? 'ALSO ' : '', _.pluck(dirtyStores, 'displayName').join(', '));
  } else {
    console.log('NO STORES CHANGED.');
  }
}

function logNoDirtyStores() {
  if (!isLoggingEnabled) {
    return;
  }
  console.log('NO STORES CHANGED.');
}

function logMessageEnd() {
  if (!isLoggingEnabled) {
    return;
  }
  console.groupEnd();
}

exports['default'] = {
  enableLogging: enableLogging,
  logActionStart: logActionStart,
  logActionPromiseResult: logActionPromiseResult,
  logMessage: logMessage,
  logDirtyStores: logDirtyStores,
  logNoDirtyStores: logNoDirtyStores,
  logMessageEnd: logMessageEnd
};
//# sourceMappingURL=logger.js.map