import _curry2 from './internal/_curry2.js';
import _has from './internal/_has.js';

/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @memberOf tili
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @return {Boolean} Whether the path exists.
 * @see has
 * @example
 *
 *      hasPath(['a', 'b'], {a: {b: 2}});         // => true
 *      hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 *      hasPath(['a', 'b'], {a: {c: 2}});         // => false
 *      hasPath(['a', 'b'], {});                  // => false
 */
const hasPath = _curry2(function hasPath(path, obj) {
  if (path.length === 0) {
    return false;
  }
  var val = obj;
  var idx = 0;
  while (idx < path.length) {
    if (_has(path[idx], val)) {
      val = val[path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }
  return true;
});

export default hasPath;
