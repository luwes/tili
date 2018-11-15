import _curry1 from './internal/_curry1.js';

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @func
 * @memberOf tili
 * @since 0.1.0
 * @category Type
 * @param {*} obj The value to check.
 * @return {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 *    function Foo() {
 *      this.a = 1
 *    }
 *
 *    isPlainObject(new Foo)
 *    // => false
 *
 *    isPlainObject([1, 2, 3])
 *    // => false
 *
 *    isPlainObject({ 'x': 0, 'y': 0 })
 *    // => true
 *
 *    isPlainObject(Object.create(null))
 *    // => true
 */
const isPlainObject = _curry1(function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
});

export default isPlainObject;
