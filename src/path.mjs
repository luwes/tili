/**
 * Retrieve the value at a given path.
 *
 * @func
 * @since v0.1.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} paths The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @example
 *
 *    path(['a', 'b'], {a: {b: 2}}); //=> 2
 *    path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
function path(paths, obj) {
  let val = obj;
  let idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
}

export default path;
