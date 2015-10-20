(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'lodash',
            'react',
            'baconjs'
        ], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('lodash'), require('react'), require('baconjs'));
    } else {
        this.Harukaze = factory(_, React, Bacon);
    }
}(function (__external__, __external_React, __external_Bacon) {
    var global = this, define;
    function _require(id) {
        var module = _require.cache[id];
        if (!module) {
            var exports = {};
            module = _require.cache[id] = {
                id: id,
                exports: exports
            };
            _require.modules[id].call(exports, module, exports);
        }
        return module.exports;
    }
    _require.cache = [];
    _require.modules = [
        function (module, exports) {
            var _ = _require(9);
            var debug = _require(2);
            var store = _require(7);
            var actions = _require(1);
            var messages = _require(5);
            var mixin = _require(6);
            module.exports = _.extend({}, debug, store, actions, messages, { Mixin: mixin });
        },
        function (module, exports) {
            'use strict';
            var logger = _require(4);
            function action(name, fn) {
                return function () {
                    logger.logActionStart(name, arguments);
                    var promise = fn.apply(action, arguments);
                    logger.logActionPromiseResult(name, promise);
                    return promise;
                };
            }
            module.exports = { action: action };
        },
        function (module, exports) {
            'use strict';
            var enabled = false;
            module.exports = { debug: { enabled: enabled } };
        },
        function (module, exports) {
            'use strict';
            var _ = _require(9);
            var Bacon = _require(8);
            var logger = _require(4);
            var bus = new Bacon.Bus();
            var dirtyStores = [];
            var dispatching = false;
            function dispatch(type, payload) {
                if (dispatching) {
                    return Promise.reject('Cascading dispatches are prohibited. Fix your flux.');
                }
                return new Promise(function (resolve, reject) {
                    dispatching = true;
                    logger.logMessage(type, payload);
                    try {
                        bus.push({
                            type: type,
                            payload: payload
                        });
                        pushChanges();
                        resolve();
                    } finally {
                        logger.logMessageEnd();
                        dispatching = false;
                    }
                });
            }
            function input(type) {
                var payloads = bus.filter(function (msg) {
                        return msg.type === type;
                    }).map('.payload');
                return payloads;
            }
            function markStoreAsDirty(store) {
                if (!_.contains(dirtyStores, store)) {
                    dirtyStores.push(store);
                }
            }
            function pushChangesOnce() {
                var stores = dirtyStores;
                dirtyStores = [];
                _.each(stores, function (store) {
                    store.changes.push(store.output);
                });
            }
            function pushChanges() {
                if (!dirtyStores.length) {
                    logger.logNoDirtyStores();
                    return;
                }
                var also = false;
                while (dirtyStores.length > 0) {
                    logger.logDirtyStores(dirtyStores, also);
                    pushChangesOnce();
                    also = true;
                }
            }
            module.exports = {
                dispatch: dispatch,
                input: input,
                markStoreAsDirty: markStoreAsDirty
            };
        },
        function (module, exports) {
            'use strict';
            var _ = _require(9);
            var debug = _require(2).debug;
            module.exports = {
                logActionStart: function (name, args) {
                    if (!debug.enabled) {
                        return;
                    }
                    if (!args.length) {
                        console.group('ACTION %s', name);
                    } else {
                        console.group('ACTION %s: %o', name, args);
                    }
                },
                logActionPromiseResult: function (name, promise) {
                    if (!debug.enabled) {
                        return;
                    }
                    promise.then(function (res) {
                        console.log('[OK] %o', res);
                        console.groupEnd();
                    }, function (err) {
                        if (err.stack) {
                            console.log('[ERR, RETHROWN] %s', err);
                            process.nextTick(function rethrow() {
                                throw err;
                            });
                        } else {
                            console.log('[ERR] %o', err);
                        }
                        console.groupEnd();
                    });
                },
                logMessage: function (name, payload) {
                    if (!debug.enabled) {
                        return;
                    }
                    if (payload) {
                        console.group('MESSAGE %s: %o', name, payload);
                    } else {
                        console.group('MESSAGE %s', name);
                    }
                },
                logDirtyStores: function (dirtyStores, also) {
                    if (!debug.enabled) {
                        return;
                    }
                    if (dirtyStores.length) {
                        console.log('%sCHANGED STORES: %s', also ? 'ALSO ' : '', _.pluck(dirtyStores, 'displayName').join(', '));
                    } else {
                        console.log('NO STORES CHANGED.');
                    }
                },
                logNoDirtyStores: function () {
                    if (!debug.enabled) {
                        return;
                    }
                    console.log('NO STORES CHANGED.');
                },
                logMessageEnd: function () {
                    if (!debug.enabled) {
                        return;
                    }
                    console.groupEnd();
                }
            };
        },
        function (module, exports) {
            'use strict';
            var dispatcher = _require(3);
            function message(type) {
                return dispatcher.dispatch.bind(dispatcher, type);
            }
            module.exports = { message: message };
        },
        function (module, exports) {
            'use strict';
            var _ = _require(9);
            var React = _require(10);
            var Mixin = {
                    wire: function (store, arg) {
                        var component = this;
                        var harukaze = this._harukaze = this._harukaze || {};
                        var unsubscribers = harukaze.unsubscribers = harukaze.unsubscribers || [];
                        var unsubscribe = null;
                        if (_.isFunction(arg)) {
                            unsubscribe = store.changes.onValue(arg);
                        } else if (_.isArray(arg)) {
                            unsubscribe = store.changes.onValue(function (output) {
                                component.setState(_.pick(output, arg));
                            });
                        }
                        unsubscribers.push(unsubscribe);
                        return unsubscribe;
                    },
                    componentWillUnmount: function () {
                        var harukaze = this._harukaze;
                        if (harukaze) {
                            var unsubscribers = harukaze.unsubscribers;
                            if (unsubscribers) {
                                _.each(unsubscribers, function (f) {
                                    f();
                                });
                            }
                        }
                    }
                };
            module.exports = Mixin;
        },
        function (module, exports) {
            'use strict';
            var _ = _require(9);
            var Bacon = _require(8);
            var dispatcher = _require(3);
            function store(displayName, spec) {
                var changes = new Bacon.Bus();
                var obj = {
                        displayName: displayName,
                        output: _.extend({}, spec.output),
                        changes: changes
                    };
                var methods = gatherStoreMethods(spec);
                bindStoreMethods(spec, obj, methods);
                wireStore(spec, obj, dispatcher.input);
                return obj;
            }
            function gatherStoreMethods(spec) {
                return _.reject(_.keys(spec), function (key) {
                    return _.contains(['output'], key);
                });
            }
            function bindStoreMethods(spec, store, methods) {
                _.each(methods, function (key) {
                    store[key] = _.bind(spec[key], store);
                });
            }
            function wireStore(spec, store, input) {
                function output(stream, property) {
                    stream.onValue(function (value) {
                        if (store.output[property] != value) {
                            store.output[property] = value;
                            dispatcher.markStoreAsDirty(store);
                        }
                    });
                }
                store.wire(input, output);
            }
            module.exports = { store: store };
        },
        function (module, exports) {
            module.exports = __external_Bacon;
        },
        function (module, exports) {
            module.exports = __external__;
        },
        function (module, exports) {
            module.exports = __external_React;
        }
    ];
    return _require(0);
}));
//# sourceMappingURL=harukaze.js.map