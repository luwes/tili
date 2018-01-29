/**
 * Check if string or array includes the searched part.
 * @param  {*} search
 * @param  {Array|String} arr
 * @return {Boolean}
 */
export default function includes(search, arr) {
  return arr.indexOf(search) !== -1;
}
