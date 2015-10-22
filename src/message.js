import Dispatcher from './dispatcher';

export function message(type) {
  return Dispatcher.dispatch.bind(Dispatcher, type);
}

export default message;
