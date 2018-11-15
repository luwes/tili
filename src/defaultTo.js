import _curry2 from './internal/_curry2.js';

/**
 * Default to a value if the passed is null or undefined.
 *
 * @func
 * @memberOf tili
 * @since v0.1.0
 * @category Logic
 * @param  {*} def - The default value.
 * @param  {*} value - The passed value.
 * @return {*}
 */
const defaultTo = _curry2(function defaultTo(def, value) {
  return value == null || value !== value ? def : value;
});

export default defaultTo;
