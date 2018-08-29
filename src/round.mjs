import _round from './internal/_round';

/**
 * Computes `number` rounded to `precision`.
 *
 * @func
 * @since 0.4.0
 * @category Math
 * @param {number} number The number to round.
 * @param {number} [precision=0] The precision to round to.
 * @returns {number} Returns the rounded number.
 * @example
 *
 *    round(4.006)
 *    // => 4
 *
 *    round(4.006, 2)
 *    // => 4.01
 *
 *    round(4060, -2)
 *    // => 4100
 */

function round(number, precision) {
  return _round('round')(number, precision);
}

export default round;
