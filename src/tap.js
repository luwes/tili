import _curry2 from './internal/_curry2.js';

/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * @func
 * @memberOf tili
 * @since v0.3.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`.
 * The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *    const sayX = x => console.log('x is ' + x);
 *    tap(sayX, 100); //=> 100
 *    // logs 'x is 100'
 *
 * @symb tap(f, a) = a
 */
const tap = _curry2(function tap(fn, x) {
  fn(x);
  return x;
});

export default tap;
