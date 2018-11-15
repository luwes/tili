import _curry1 from './internal/_curry1.js';

/**
 * Memoize a function.
 *
 * @func
 * @memberOf tili
 * @since v0.1.0
 * @category Function
 * @param  {Function} fn
 * @return {*}
 */
const memoize = _curry1(function memoize(fn) {
  let lastArgs = null;
  let lastResult = null;
  return function() {
    if (!areArgumentsShallowlyEqual(lastArgs, arguments)) {
      lastResult = fn.apply(null, arguments);
    }
    lastArgs = arguments;
    return lastResult;
  };
});

function areArgumentsShallowlyEqual(prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }
  const length = prev.length;
  for (let i = 0; i < length; i++) {
    if (prev[i] !== next[i]) {
      return false;
    }
  }
  return true;
}

export default memoize;
