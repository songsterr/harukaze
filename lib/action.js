'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function action(name, fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _logger2['default'].logActionStart(name, args);
    var promise = fn.apply(null, args);
    _logger2['default'].logActionPromiseResult(name, promise);
    return promise;
  };
}

exports['default'] = action;
module.exports = exports['default'];
//# sourceMappingURL=action.js.map