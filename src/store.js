var _ = require('lodash');
var Bacon = require('baconjs');
var dispatcher = require('./dispatcher');

function store(displayName, spec) {
  var changes = new Bacon.Bus();  
  var obj = {
    displayName: displayName,
    output: _.extend({}, spec.output),
    changes: changes
  };
  
  var methods = gatherStoreMethods(spec);
  bindStoreMethods(spec, obj, methods);
  wireStore(spec, obj, dispatcher.input);
  return obj;
}

function gatherStoreMethods(spec) {
  return _.reject(_.keys(spec), function (key) {
    return _.contains(['output'], key);
  });
}

function bindStoreMethods(spec, store, methods) {
  _.each(methods, function(key) {
    store[key] = _.bind(spec[key], store);
  });
}

function wireStore(spec, store, input) {
  function output(stream, property) {
    stream.onValue(function (value) {
      if (store.output[property] != value) {
        store.output[property] = value;
        dispatcher.markStoreAsDirty(store);        
      }
    });
  }
  store.wire(input, output);
} 
  
module.exports = {
  store: store
};
