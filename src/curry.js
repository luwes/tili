import curryN from './curryN';

export default function curry(fn, ...args) {
  return curryN(fn.length, fn, ...args);
}
