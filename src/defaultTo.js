/**
 * Default to a value if the passed is null or undefined.
 *
 * @func
 * @memberOf tili
 * @since v0.1.0
 * @category Logic
 * @param  {*} d - The default value.
 * @param  {*} v - The passed value.
 * @return {*}
 */
function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
}

export default defaultTo;
