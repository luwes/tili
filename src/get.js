import _curry2 from './internal/_curry2.js';
import is from './is.js';
import path from './path.js';

/**
 * Get a object value by a string dot path or array path.
 *
 * @func
 * @memberOf tili
 * @since v0.7.0
 * @category Object
 * @param  {String|Array} paths
 * @param  {Object} obj
 * @return {*}
 */
const get = _curry2(function get(paths, obj) {
  if (is(String, paths)) {
    return path(paths.split('.'), obj);
  }
  return path(paths, obj);
});

export default get;
