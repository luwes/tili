import _curry2 from './internal/_curry2.js';
import _round from './internal/_round.js';

/**
 * Computes `number` rounded to `precision`.
 *
 * @func
 * @memberOf tili
 * @since 0.4.0
 * @category Math
 * @param {number} precision The precision to round to.
 * @param {number} number The number to round.
 * @returns {number} Returns the rounded number.
 * @example
 *
 *    round(0, 4.006)
 *    // => 4
 *
 *    round(2, 4.006)
 *    // => 4.01
 *
 *    round(-2, 4060)
 *    // => 4100
 */

const round = _curry2(function round(precision, number) {
  return _round('round')(precision, number);
});

export default round;
