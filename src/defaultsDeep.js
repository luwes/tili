import isPlainObject from './isPlainObject';

/**
 * This method is like `defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 0.7.0
 * @category Object
 * @param {Object} target The destination object.
 * @param {...Object} [sources] The source objects.
 * @return {Object} Returns `object`.
 * @see defaults
 * @example
 *
 * defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } })
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
export default function defaultsDeep(target, ...sources) {
  return sources.reduce(_defaultsDeep, target);
}

function _defaultsDeep(target, source) {
  if (target === source) {
    return target;
  }

  if (Array.isArray(source)) {
    return defaultsArray(target, source);
  }

  if (isPlainObject(source)) {
    return defaultsObject(target, source);
  }

  if (target == null) {
    return clone(source);
  }

  return target;
}

function defaultsArray(target, source) {
  if (!target) target = [];
  if (Array.isArray(target)) {
    for (var i = 0; i < source.length; i++) {
      target[i] = _defaultsDeep(target[i], source[i]);
    }
  }
  return target;
}

function defaultsObject(target, source) {
  if (!target) target = {};
  Object.keys(source).forEach(function(key) {
    const isDefaultable =
      !isUndefinedSource(target[key], source[key]) ||
      isPlainObject(source[key]) ||
      Array.isArray(source[key]);
    if (isDefaultable) {
      target[key] = _defaultsDeep(target[key], source[key]);
    }
  });
  return target;
}

function isUndefinedSource(target, source) {
  return target && source === undefined;
}

function clone(source) {
  if (isPlainObject(source)) {
    return _defaultsDeep(emptyTarget(source), source);
  }
  return source;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
