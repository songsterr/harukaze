var _ = require('lodash');
var Promise = require('es6-promise').Promise;
var Bacon = require('baconjs');
var logger = require('./logger');

var bus = new Bacon.Bus();
var dirtyStores = [];
var dispatching = false;

function dispatch(type, payload) {
  if (dispatching) {
    return Promise.reject('Cascading dispatches are prohibited. Fix your flux.');
  }
  return new Promise(function (resolve, reject) {
    dispatching = true;
    logger.logMessage(type, payload);
    try {
      bus.push({type: type, payload: payload});
      pushChanges();
      resolve();
    } finally {
      logger.logMessageEnd();
      dispatching = false;
    }
  });
}

function input(type) {
  var payloads = bus.filter(function (msg) {
     return msg.type === type;
  }).map('.payload');
  return payloads;
}

function markStoreAsDirty(store) {
  if (!_.contains(dirtyStores, store)) {
    dirtyStores.push(store);    
  }
}

function pushChangesOnce() {
  var stores = dirtyStores;
  dirtyStores = [];
  _.each(stores, function (store) {
    store.changes.push(store.output);      
  });
}

function pushChanges() {
  if (!dirtyStores.length) {
    logger.logNoDirtyStores();
    return;
  }
  var also = false;
  while(dirtyStores.length > 0) {
    logger.logDirtyStores(dirtyStores, also);
    pushChangesOnce();
    also = true;
  }
}

module.exports = {
  dispatch: dispatch,
  input: input,
  markStoreAsDirty: markStoreAsDirty
};
