/**
 * Default to a value if the passed is null or undefined.
 * @param  {*} d - The default value.
 * @param  {*} v - The passed value.
 * @return {*}
 */
export default function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
}
