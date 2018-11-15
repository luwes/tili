import _curry1 from './internal/_curry1.js';

let idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @func
 * @memberOf tili
 * @since 0.1.0
 * @category Util
 * @param {string} prefix The value to prefix the ID with.
 * @return {string} Returns the unique ID.
 * @example
 *
 *    uniqueId('contact_');
 *    // => 'contact_104'
 *
 *    uniqueId();
 *    // => '105'
 */
const uniqueId = _curry1(function uniqueId(prefix) {
  var id = ++idCounter;
  return `${prefix}${id}`;
});

export default uniqueId;
