'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.message = message;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function message(type) {
  return _Dispatcher2['default'].dispatch.bind(_Dispatcher2['default'], type);
}
//# sourceMappingURL=message.js.map