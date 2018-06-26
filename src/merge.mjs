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
export default function merge(target, ...sources) {
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

  return clone(source);
}

function mergeArray(target, source) {
  if (!target) target = [];
  if (Array.isArray(target)) {
    for (var i = 0; i < source.length; i++) {
      target[i] = _merge(target[i], source[i]);
    }
  }
  return target;
}

function mergeObject(target, source) {
  if (!target) target = {};
  Object.keys(source).forEach(function(key) {
    const isMergeable =
      !isUndefinedSource(target[key], source[key]) ||
      isPlainObject(source[key]) ||
      Array.isArray(source[key]);
    if (isMergeable) {
      target[key] = _merge(target[key], source[key]);
    }
  });
  return target;
}

function isUndefinedSource(target, source) {
  return target && source === undefined;
}

function clone(source) {
  if (isPlainObject(source)) {
    return _merge(emptyTarget(source), source);
  }
  return source;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
