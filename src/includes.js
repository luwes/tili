import _curry2 from './internal/_curry2.js';

/**
 * Check if string or array includes the searched part.
 *
 * @func
 * @memberOf tili
 * @since v0.1.0
 * @category List
 * @param  {*} search
 * @param  {Array|String} arr
 * @return {Boolean}
 */
const includes = _curry2(function includes(search, arr) {
  return arr.indexOf(search) !== -1;
});

export default includes;
