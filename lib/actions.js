import {logActionStart, logActionPromiseResult} from './logger';

export function action(name, fn) {
  return () => {
    logActionStart(name, arguments);
    const promise = fn.apply(action, arguments);
    logActionPromiseResult(name, promise);
    return promise;
  };
}

export default { action };
