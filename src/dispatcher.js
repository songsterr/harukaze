import * as _ from 'lodash';
import Bacon from 'baconjs';
import Logger from './Logger';

class Dispatcher {
  constructor() {
    this.bus = new Bacon.Bus();
    this.dirtyStores = [];
    this.dispatching = false;
  }

  _pushChangesOnce() {
    const stores = this.dirtyStores;
    this.dirtyStores = [];
    _.each(stores, (store) => {
      store.changes.push(store.output);
    });
  }

  _pushChanges() {
    if (!this.dirtyStores.length) {
      Logger.logNoDirtyStores();
      return;
    }
    let also = false;
    while (this.dirtyStores.length > 0) {
      Logger.logDirtyStores(this.dirtyStores, also);
      this._pushChangesOnce();
      also = true;
    }
  }

  dispatch(type, payload) {
    if (this.dispatching) {
      return Promise.reject('Cascading dispatches are prohibited. Fix your flux.');
    }
    return new Promise((resolve) => {
      this.dispatching = true;
      Logger.logMessage(type, payload);
      try {
        this.bus.push({type: type, payload: payload});
        this._pushChanges();
        resolve();
      } finally {
        Logger.logMessageEnd();
        this.dispatching = false;
      }
    });
  }

  input(type) {
    return this.bus.filter(msg => msg.type === type).map('.payload');
  }

  markStoreAsDirty(store) {
    if (!_.contains(this.dirtyStores, store)) {
      this.dirtyStores.push(store);
    }
  }
}

export default new Dispatcher();
