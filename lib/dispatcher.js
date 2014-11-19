var _ = require('underscore');
var Promise = require('es6-promise').Promise;
var Bacon = require('baconjs');
var logger = require('./logger');

var bus = new Bacon.Bus();
var dirtyStores = [];

function dispatch(type, payload) {
  return new Promise(function (resolve, reject) {
    logger.logMessage(type, payload);
    bus.push({type: type, payload: payload});
    logger.logDirtyStores(dirtyStores);
    pushChanges(dirtyStores);
    clearDirtyMarks();
    resolve();
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

function pushChanges(dirtyStores) {
  setTimeout(function () {
    _.each(dirtyStores, function (store) {
      store.changes.push(store.output);
    });    
  }, 0);
}

function clearDirtyMarks() {
  dirtyStores = [];
}

module.exports = {
  dispatch: dispatch,
  input: input,
  markStoreAsDirty: markStoreAsDirty
};
