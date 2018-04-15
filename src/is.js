/**
 * Check if a value is of a certain type.
 * @param  {*} Ctor - Constructor, can be built in types or user-defined.
 * @param  {*} val
 * @return {Boolean}
 * @example
 *
 *      is(Object, {}); //=> true
 *      is(Number, 1); //=> true
 *      is(Object, 1); //=> false
 *      is(String, 's'); //=> true
 *      is(String, new String('')); //=> true
 *      is(Object, new String('')); //=> true
 *      is(Object, 's'); //=> false
 *      is(Number, {}); //=> false
 */
export default function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor);
}
