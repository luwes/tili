let idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @func
 * @since 0.1.0
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @return {string} Returns the unique ID.
 * @example
 *
 *      uniqueId('contact_');
 *      // => 'contact_104'
 *
 *      uniqueId();
 *      // => '105'
 */
export default function uniqueId(prefix) {
  var id = ++idCounter;
  return `${prefix}${id}`;
}
