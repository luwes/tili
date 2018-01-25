import is from './is';
import path from './path';

export default function get(paths, obj) {
  if (is(String, paths)) {
    return path(paths.split('.'), obj);
  }
  return path(paths, obj);
}
