import { enableLogging } from './lib/logger';
import store from './lib/store';
import actions from './lib/actions';
import messages from './lib/messages';
import Mixin from './lib/mixin';

module.exports = Object.assign({}, { enableLogging }, store, actions, messages, { Mixin });
