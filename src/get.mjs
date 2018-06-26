import is from './is';
import path from './path';

/**
 * Get a object value by a string dot path or array path.
 *
 * @func
 * @since v0.7.0
 * @category Object
 * @param  {String|Array} paths
 * @param  {Object} obj
 * @return {*}
 */
export default function get(paths, obj) {
  if (is(String, paths)) {
    return path(paths.split('.'), obj);
  }
  return path(paths, obj);
}
