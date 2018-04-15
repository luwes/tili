/**
 * Check if string or array includes the searched part.
 *
 * @func
 * @since v0.1.0
 * @category List
 * @param  {*} search
 * @param  {Array|String} arr
 * @return {Boolean}
 */
export default function includes(search, arr) {
  return arr.indexOf(search) !== -1;
}
