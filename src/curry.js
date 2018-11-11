import curryN from './curryN';

/**
 * Curry a function.
 *
 * @func
 * @memberOf tili
 * @since v0.1.0
 * @category Function
 * @param  {Function} fn
 * @param  {...Function} args
 * @return {Function}
 */
function curry(fn, ...args) {
  return curryN(fn.length, fn, ...args);
}

export default curry;
