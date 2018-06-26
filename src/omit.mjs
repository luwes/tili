/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @since v0.3.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see pick
 * @example
 *
 *    omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */
export default function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
}
