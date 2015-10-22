import Logger from './logger';

function action(name, fn) {
  return (...args) => {
    Logger.logActionStart(name, args);
    const promise = fn(...args);
    Logger.logActionPromiseResult(name, promise);
    return promise;
  };
}

export default action;
