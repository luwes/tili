/* eslint no-undef:0 */

/**
 * Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to func when it's invoked.
 *
 * @func
 * @since v0.4.0
 * @category Function
 * @param  {Function} func - Deferred function
 * @param {*} [args] Optional arguments
 * @see  https://github.com/jamiebuilds/tickedoff
 */
export default function defer(func, ...args) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }

  var tick;
  if (typeof process === 'object' && typeof process.nextTick === 'function') {
    tick = process.nextTick;
  } else if (typeof Promise === 'function') {
    var resolve = Promise.resolve();
    tick = resolve.then.bind(resolve);
  } else if (typeof setImmediate === 'function') {
    tick = setImmediate;
  } else {
    tick = setTimeout;
  }

  tick(() => func(...args));
}
