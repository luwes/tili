import isFunction from './internal/_isFunction';
import isObjectLike from './internal/_isObjectLike';
import isPlainObject from './isPlainObject';

/**
 * This method is like `assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `target`.
 *
 * @since 0.4.0
 * @category Object
 * @param {Object} target The destination object.
 * @param {...Object} [sources] The source objects.
 * @return {Object} Returns `object`.
 * @example
 *
 *    const object = {
 *      'a': [{ 'b': 2 }, { 'd': 4 }]
 *    }
 *
 *    const other = {
 *      'a': [{ 'c': 3 }, { 'e': 5 }]
 *    }
 *
 *    merge(object, other)
 *    // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
function merge(target, ...sources) {
  return sources.reduce(_merge, target);
}

function _merge(target, source) {
  if (target === source) {
    return target;
  }

  if (Array.isArray(source)) {
    return mergeArray(target, source);
  }

  if (isPlainObject(source)) {
    return mergeObject(target, source);
  }

  if (source === undefined) {
    return target;
  }

  return source;
}

function mergeArray(target, source) {
  if (!Array.isArray(target)) {
    target = [];
  }
  for (var i = 0; i < source.length; i++) {
    target[i] = _merge(target[i], source[i]);
  }
  return target;
}

function mergeObject(target, source) {
  if (!isObjectLike(target) && !isFunction(target)) {
    target = {};
  }
  for (var key in source) {
    target[key] = _merge(target[key], source[key]);
  }
  return target;
}

export default merge;
