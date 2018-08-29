/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 *
 * @func
 * @since 0.4.0
 * @category Function
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Function} func The function to delay.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @return {number} Returns the timer id.
 * @example
 *
 *    delay(text => console.log(text), 1000, 'later')
 *    // => Logs 'later' after one second.
 */
function delay(wait, func, ...args) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  return setTimeout(func, +wait || 0, ...args);
}

export default delay;
