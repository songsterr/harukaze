/* eslint no-console:0 */

import * as _ from 'lodash';

let isLoggingEnabled = false;

export function enableLogging() {
  isLoggingEnabled = true;
}

export function logActionStart(name, args) {
  if (!isLoggingEnabled) { return; }
  if (!args.length) {
    console.group('ACTION %s', name);
  } else {
    console.group('ACTION %s: %o', name, args);
  }
}

export function logActionPromiseResult(name, promise) {
  if (!isLoggingEnabled) { return; }
  promise.then((res) => {
    console.log('[OK] %o', res);
    console.groupEnd();
  }, (err) => {
    if (err.stack) {
      console.log('[ERR, RETHROWN] %s', err);
      process.nextTick(function rethrow() { throw err; });
    } else {
      console.log('[ERR] %o', err);
    }
    console.groupEnd();
  });
}

export function logMessage(name, payload) {
  if (!isLoggingEnabled) { return; }
  if (payload) {
    console.group('MESSAGE %s: %o', name, payload);
  } else {
    console.group('MESSAGE %s', name);
  }
}

export function logDirtyStores(dirtyStores, also) {
  if (!isLoggingEnabled) { return; }
  if (dirtyStores.length) {
    console.log('%sCHANGED STORES: %s', (also ? 'ALSO ' : ''), _.pluck(dirtyStores, 'displayName').join(', '));
  } else {
    console.log('NO STORES CHANGED.');
  }
}

export function logNoDirtyStores() {
  if (!isLoggingEnabled) { return; }
  console.log('NO STORES CHANGED.');
}

export function logMessageEnd() {
  if (!isLoggingEnabled) { return; }
  console.groupEnd();
}

export default {
  enableLogging,
  logActionStart,
  logActionPromiseResult,
  logMessage,
  logDirtyStores,
  logNoDirtyStores,
  logMessageEnd,
};
