import Dispatcher from './Dispatcher';

export function message(type) {
  return Dispatcher.dispatch.bind(Dispatcher, type);
}
