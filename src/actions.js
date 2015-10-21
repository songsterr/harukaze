import Logger from './Logger';

export function action(name, fn) {
  return () => {
    Logger.logActionStart(name, arguments);
    const promise = fn.apply(action, arguments);
    Logger.logActionPromiseResult(name, promise);
    return promise;
  };
}

export default { action };
