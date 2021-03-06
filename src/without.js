import _curry2 from './internal/_curry2.js';
import includes from './includes.js';

/**
 * Returns a new list without values in the first argument.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf tili
 * @since v0.11.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} xs The values to be removed from `list2`.
 * @param {Array} list The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @example
 *
 *      without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */
const without = _curry2(function without(xs, list) {
  return list.filter(search => !includes(search, xs));
});

export default without;
