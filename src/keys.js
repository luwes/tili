import _curry1 from './internal/_curry1.js';

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf tili
 * @since v0.11.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see values
 * @example
 *
 *      keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */

const keys = _curry1(Object.keys);
export default keys;
