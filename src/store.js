import * as _ from 'lodash';
import Bacon from 'baconjs';
import Dispatcher from './dispatcher';

function gatherStoreMethods(spec) {
  return _.reject(_.keys(spec), key => _.contains(['output'], key));
}

function bindStoreMethods(spec, target, methods) {
  _.each(methods, key => {
    target[key] = _.bind(spec[key], target);
  });
}

function wireStore(spec, target, input) {
  function output(stream, property) {
    stream.skipDuplicates().onValue(value => {
      target.output[property] = value;
      Dispatcher.markStoreAsDirty(target);
    });
  }
  target.wire(input, output);
}

function store(displayName, spec) {
  const changes = new Bacon.Bus();
  const obj = {
    displayName: displayName,
    output: _.extend({}, spec.output),
    changes: changes,
  };

  const methods = gatherStoreMethods(spec);
  bindStoreMethods(spec, obj, methods);
  wireStore(spec, obj, Dispatcher.input.bind(Dispatcher));
  return obj;
}

export default store;
