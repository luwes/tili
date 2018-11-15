import _curry3 from './internal/_curry3.js';

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf tili
 * @since v0.4.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} min The lower limit of the clamp (inclusive)
 * @param {Number} max The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      clamp(1, 10, -5) // => 1
 *      clamp(1, 10, 15) // => 10
 *      clamp(1, 10, 4)  // => 4
 */
const clamp = _curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error(
      'min must not be greater than max in clamp(min, max, value)'
    );
  }
  return value < min ? min : value > max ? max : value;
});

export default clamp;
