'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function store(displayName, spec) {
  var changes = new _baconjs2['default'].Bus();
  var obj = {
    displayName: displayName,
    output: _.extend({}, spec.output),
    changes: changes
  };

  var methods = gatherStoreMethods(spec);
  bindStoreMethods(spec, obj, methods);
  wireStore(spec, obj, _Dispatcher2['default'].input.bind(_Dispatcher2['default']));
  return obj;
}

function gatherStoreMethods(spec) {
  return _.reject(_.keys(spec), function (key) {
    return _.contains(['output'], key);
  });
}

function bindStoreMethods(spec, store, methods) {
  _.each(methods, function (key) {
    store[key] = _.bind(spec[key], store);
  });
}

function wireStore(spec, store, input) {
  function output(stream, property) {
    stream.onValue(function (value) {
      if (store.output[property] != value) {
        store.output[property] = value;
        _Dispatcher2['default'].markStoreAsDirty(store);
      }
    });
  }
  store.wire(input, output);
}

module.exports = {
  store: store
};
//# sourceMappingURL=store.js.map