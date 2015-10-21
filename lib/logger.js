/* eslint no-console:0 */

import * as _ from 'lodash';
import { debug } from './debug';

export function logActionStart(name, args) {
  if (!debug.enabled) { return; }
  if (!args.length) {
    console.group('ACTION %s', name);
  } else {
    console.group('ACTION %s: %o', name, args);
  }
}

export function logActionPromiseResult(name, promise) {
  if (!debug.enabled) { return; }
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
  if (!debug.enabled) { return; }
  if (payload) {
    console.group('MESSAGE %s: %o', name, payload);
  } else {
    console.group('MESSAGE %s', name);
  }
}

export function logDirtyStores(dirtyStores, also) {
  if (!debug.enabled) { return; }
  if (dirtyStores.length) {
    console.log('%sCHANGED STORES: %s', (also ? 'ALSO ' : ''), _.pluck(dirtyStores, 'displayName').join(', '));
  } else {
    console.log('NO STORES CHANGED.');
  }
}

export function logNoDirtyStores() {
  if (!debug.enabled) { return; }
  console.log('NO STORES CHANGED.');
}

export function logMessageEnd() {
  if (!debug.enabled) { return; }
  console.groupEnd();
}

export default {
  logActionStart,
  logActionPromiseResult,
  logMessage,
  logDirtyStores,
  logNoDirtyStores,
  logMessageEnd,
};
