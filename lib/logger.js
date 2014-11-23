var _ = require('lodash');
var debug = require('./debug').debug;

module.exports = {
  logActionStart: function (name, args) {
    if (!debug.enabled) { return; }
    if (!args.length) {
      console.group('ACTION %s', name);     
    } else {
      console.group('ACTION %s: %o', name, args);           
    }
  },

  logActionPromiseResult: function (name, promise) {
    if (!debug.enabled) { return; }
    promise.then(function(res) {
      console.log('[OK] %o', res);
      console.groupEnd();
    }, function(err) {
      if (err.stack) {
        console.log('[ERR, RETHROWN] %s', err);
        process.nextTick(function rethrow() { throw err; });        
      } else {
        console.log('[ERR] %o', err);        
      }
      console.groupEnd();
    });
  },

  logMessage: function (name, payload) {
    if (!debug.enabled) { return; }
    if (payload) {
      console.group('MESSAGE %s: %o', name, payload);
    } else {
      console.group('MESSAGE %s', name);    
    }
  },
  
  logDirtyStores: function (dirtyStores, also) {
    if (!debug.enabled) { return; }
    if (dirtyStores.length) {
      console.log("%sCHANGED STORES: %s", (also ? 'ALSO ' : ''), _.pluck(dirtyStores, 'displayName').join(', '));
    } else {
      console.log("NO STORES CHANGED.");
    }
    console.groupEnd();
  }
};
