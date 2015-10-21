import { enableLogging } from './logger';
import store from './store';
import actions from './actions';
import { message } from './message';
import Mixin from './mixin';

module.exports = Object.assign({}, { enableLogging }, store, actions, { message, Mixin });
