import _curry2 from './internal/_curry2.js';

/**
 * Returns a new array by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf tili
 * @since v0.12.0
 * @category List
 * @sig [a] -> [b]
 * @param {Number} depth The flatten depth level.
 * @param {Array} arr The array to consider.
 * @return {Array} The flattened array.
 * @example
 *
 *      flat(10, [1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
const flat = _curry2(function flat(depth, arr) {
  return depth === 0
    ? arr
    : arr.reduce(
        (acc, val) =>
          Array.isArray(val)
            ? acc.concat(flat(depth - 1, val))
            : acc.concat(val),
        []
      );
});

export default flat;
