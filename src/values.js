import _curry1 from './internal/_curry1.js';

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf tili
 * @since v0.6.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @example
 *
 *      values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */
const values = _curry1(function values(obj) {
  return Object.keys(obj).map(i => obj[i]);
});

export default values;
