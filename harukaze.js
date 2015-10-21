import * as _ from 'lodash';

import debug from './lib/debug';
import store from './lib/store';
import actions from './lib/actions';
import messages from './lib/messages';
import Mixin from './lib/mixin';

module.exports = _.extend({}, debug, store, actions, messages, { Mixin });
