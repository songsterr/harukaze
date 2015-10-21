'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.action = action;

var _logger = require('./logger');

function action(name, fn) {
  var _arguments = arguments;

  return function () {
    (0, _logger.logActionStart)(name, _arguments);
    var promise = fn.apply(action, _arguments);
    (0, _logger.logActionPromiseResult)(name, promise);
    return promise;
  };
}

exports['default'] = { action: action };
//# sourceMappingURL=actions.js.map