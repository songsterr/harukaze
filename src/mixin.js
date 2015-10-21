import * as _ from 'lodash';

export default {
  wire(store, arg) {
    const component = this;
    const harukaze = this._harukaze = this._harukaze || {};
    const unsubscribers = harukaze.unsubscribers = harukaze.unsubscribers || [];
    let unsubscribe = null;

    if (_.isFunction(arg)) {
      unsubscribe = store.changes.onValue(arg);
    } else if (_.isArray(arg)) {
      unsubscribe = store.changes.onValue(output => component.setState(_.pick(output, arg)));
    }

    unsubscribers.push(unsubscribe);
    return unsubscribe;
  },

  componentWillUnmount() {
    const harukaze = this._harukaze;
    if (harukaze) {
      const unsubscribers = harukaze.unsubscribers;
      if (unsubscribers) {
        _.each(unsubscribers, fn => fn());
      }
    }
  },
};
