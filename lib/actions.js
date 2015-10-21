'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.action = action;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function action(name, fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _Logger2['default'].logActionStart(name, args);
    var promise = fn.apply(null, args);
    _Logger2['default'].logActionPromiseResult(name, promise);
    return promise;
  };
}

exports['default'] = { action: action };
//# sourceMappingURL=actions.js.map