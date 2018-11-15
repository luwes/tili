import _curry1 from './internal/_curry1.js';

/**
 * If the provided `value` is an array returns a copy of it otherwise returns an array containing the original `value`.
 *
 * @static
 * @memberOf tili
 * @since 0.12.0
 * @category Type
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => false
 */
const castArray = _curry1(function castArray(value) {
  return Array.isArray(value) ? value.slice(0) : [value];
});

export default castArray;
