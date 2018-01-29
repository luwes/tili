/**
 * Get an object value by array paths.
 * @param  {string[]} paths
 * @param  {object} obj
 * @return {*}
 */
export default function path(paths, obj) {
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
