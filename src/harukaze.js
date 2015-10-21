import Logger from './Logger';
import store from './store';
import actions from './actions';
import { message } from './message';
import Mixin from './mixin';

module.exports = Object.assign({}, store, actions, { Logger, message, Mixin });
