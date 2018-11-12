import _isArrayLike from './internal/_isArrayLike';

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf tili
 * @since v0.12.0
 * @category List
 * @sig [a] -> [b]
 * @param {Number} [depth] The flatten depth level.
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @example
 *
 *      flat([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
function flat(depth, list) {
  if (typeof depth !== 'number') {
    list = depth;
    depth = Number.MAX_VALUE;
  }

  var value, jlen, j;
  var result = [];
  var idx = 0;
  var ilen = list.length;

  while (idx < ilen) {
    if (_isArrayLike(list[idx])) {
      value = depth > 1 ? flat(depth - 1, list[idx]) : list[idx];
      j = 0;
      jlen = value.length;
      while (j < jlen) {
        result[result.length] = value[j];
        j += 1;
      }
    } else {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}

export default flat;
