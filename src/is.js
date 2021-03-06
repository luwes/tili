import _curry2 from './internal/_curry2.js';

/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf tili
 * @since v0.1.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} Ctor A constructor
 * @param {*} value The value to test
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
const is = _curry2(function is(Ctor, value) {
  return value != null && (value.constructor === Ctor || value instanceof Ctor);
});

export default is;
