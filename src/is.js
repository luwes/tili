/**
 * Check if a value is of a certain type.
 * @param  {*} Ctor - Constructor, can be built in types or user-defined.
 * @param  {*} val
 * @return {Boolean}
 */
export default function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor);
}
