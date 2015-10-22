'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.message = message;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function message(type) {
  return _dispatcher2['default'].dispatch.bind(_dispatcher2['default'], type);
}

exports['default'] = message;
//# sourceMappingURL=message.js.map