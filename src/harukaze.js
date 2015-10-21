import { enableLogging } from './logger';
import store from './store';
import actions from './actions';
import messages from './messages';
import Mixin from './mixin';

module.exports = Object.assign({}, { enableLogging }, store, actions, messages, { Mixin });
