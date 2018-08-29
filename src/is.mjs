/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @since v0.1.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} Ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *    is(Object, {}); //=> true
 *    is(Number, 1); //=> true
 *    is(Object, 1); //=> false
 *    is(String, 's'); //=> true
 *    is(String, new String('')); //=> true
 *    is(Object, new String('')); //=> true
 *    is(Object, 's'); //=> false
 *    is(Number, {}); //=> false
 */
function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor);
}

export default is;
