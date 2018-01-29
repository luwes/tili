import curryN from './curryN';

/**
 * Curry a function.
 * @param  {Function} fn
 * @param  {...Function} args
 * @return {Function}
 */
export default function curry(fn, ...args) {
  return curryN(fn.length, fn, ...args);
}
