import isPlainObject from './isPlainObject';

/**
 * Deeply assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
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
function defaultsDeep(target, ...sources) {
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

  if (target === undefined) {
    return source;
  }

  return target;
}

function defaultsArray(target, source) {
  if (target === undefined) target = [];
  if (Array.isArray(target)) {
    for (var i = 0; i < source.length; i++) {
      target[i] = _defaultsDeep(target[i], source[i]);
    }
  }
  return target;
}

function defaultsObject(target, source) {
  if (target === undefined) target = {};
  for (var key in source) {
    target[key] = _defaultsDeep(target[key], source[key]);
  }
  return target;
}

export default defaultsDeep;
