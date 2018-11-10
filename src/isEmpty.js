// https://github.com/ianstormtaylor/is-empty

/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @since v0.4.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} val
 * @return {Boolean}
 * @example
 *
 *      isEmpty([1, 2, 3]);   //=> false
 *      isEmpty([]);          //=> true
 *      isEmpty('');          //=> true
 *      isEmpty(null);        //=> true
 *      isEmpty({});          //=> true
 *      isEmpty({length: 0}); //=> false
 */
function isEmpty(val) {
  // Null and Undefined...
  if (val == null) return true;

  // Booleans...
  if ('boolean' == typeof val) return false;

  // Numbers...
  if ('number' == typeof val) return val === 0;

  // Strings...
  if ('string' == typeof val) return val.length === 0;

  // Functions...
  if ('function' == typeof val) return val.length === 0;

  // Arrays...
  if (Array.isArray(val)) return val.length === 0;

  // Errors...
  if (val instanceof Error) return val.message === '';

  var has = Object.prototype.hasOwnProperty;
  var toString = Object.prototype.toString;

  // Objects...
  if (val.toString == toString) {
    switch (val.toString()) {
      // Maps, Sets, Files and Errors...
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return val.size === 0;
      }

      // Plain objects...
      case '[object Object]': {
        for (var key in val) {
          if (has.call(val, key)) return false;
        }

        return true;
      }
    }
  }

  // Anything else...
  return false;
}

export default isEmpty;
