/* eslint no-console:0 */

import * as _ from 'lodash';

class Logger {
  constructor() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }

  logActionStart(name, args) {
    if (!this.enabled) { return; }
    if (!args.length) {
      console.group('ACTION %s', name);
    } else {
      console.group('ACTION %s: %o', name, args);
    }
  }

  logActionPromiseResult(name, promise) {
    if (!this.enabled) { return; }
    promise.then(res => {
      console.log('[OK] %o', res);
      console.groupEnd();
    }, err => {
      if (err.stack) {
        console.log('[ERR, RETHROWN] %s', err);
        process.nextTick(function rethrow() { throw err; });
      } else {
        console.log('[ERR] %o', err);
      }
      console.groupEnd();
    });
  }

  logMessage(name, payload) {
    if (!this.enabled) { return; }
    if (payload) {
      console.group('MESSAGE %s: %o', name, payload);
    } else {
      console.group('MESSAGE %s', name);
    }
  }

  logDirtyStores(dirtyStores, also) {
    if (!this.enabled) { return; }
    if (dirtyStores.length) {
      console.log('%sCHANGED STORES: %s', (also ? 'ALSO ' : ''), _.pluck(dirtyStores, 'displayName').join(', '));
    } else {
      console.log('NO STORES CHANGED.');
    }
  }

  logNoDirtyStores() {
    if (!this.enabled) { return; }
    console.log('NO STORES CHANGED.');
  }

  logMessageEnd() {
    if (!this.enabled) { return; }
    console.groupEnd();
  }
}

export default new Logger();
