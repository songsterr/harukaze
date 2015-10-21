'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.action = action;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

function action(name, fn) {
  var _arguments = arguments;

  return function () {
    _Logger2['default'].logActionStart(name, _arguments);
    var promise = fn.apply(action, _arguments);
    _Logger2['default'].logActionPromiseResult(name, promise);
    return promise;
  };
}

exports['default'] = { action: action };
//# sourceMappingURL=actions.js.map