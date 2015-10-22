'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _baconjs = require('baconjs');

var _baconjs2 = _interopRequireDefault(_baconjs);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function gatherStoreMethods(spec) {
  return _.reject(_.keys(spec), function (key) {
    return _.contains(['output'], key);
  });
}

function bindStoreMethods(spec, target, methods) {
  _.each(methods, function (key) {
    target[key] = _.bind(spec[key], target);
  });
}

function wireStore(spec, target, input) {
  function output(stream, property) {
    stream.skipDuplicates().onValue(function (value) {
      target.output[property] = value;
      _dispatcher2['default'].markStoreAsDirty(target);
    });
  }
  target.wire(input, output);
}

function store(displayName, spec) {
  var changes = new _baconjs2['default'].Bus();
  var obj = {
    displayName: displayName,
    output: _.extend({}, spec.output),
    changes: changes
  };

  var methods = gatherStoreMethods(spec);
  bindStoreMethods(spec, obj, methods);
  wireStore(spec, obj, _dispatcher2['default'].input.bind(_dispatcher2['default']));
  return obj;
}

exports['default'] = store;
module.exports = exports['default'];
//# sourceMappingURL=store.js.map