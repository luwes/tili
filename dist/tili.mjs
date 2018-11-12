var __ = { '@@functional/placeholder': true };

function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return Array.isArray(value) ? value : [value];
}

function clamp(min, max, value) {
  if (min > max) {
    throw new Error(
      'min must not be greater than max in clamp(min, max, value)'
    );
  }
  return value < min ? min : value > max ? max : value;
}

function _cloneRegExp(pattern) {
  return new RegExp(
    pattern.source,
    (pattern.global ? 'g' : '') +
      (pattern.ignoreCase ? 'i' : '') +
      (pattern.multiline ? 'm' : '') +
      (pattern.sticky ? 'y' : '') +
      (pattern.unicode ? 'u' : '')
  );
}

function type(val) {
  return val === null
    ? 'Null'
    : val === undefined
    ? 'Undefined'
    : Object.prototype.toString.call(val).slice(8, -1);
}

function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = deep
        ? _clone(value[key], refFrom, refTo, true)
        : value[key];
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':
      return copy({});
    case 'Array':
      return copy([]);
    case 'Date':
      return new Date(value.valueOf());
    case 'RegExp':
      return _cloneRegExp(value);
    default:
      return value;
  }
}

function clone(value) {
  return value != null && typeof value.clone === 'function'
    ? value.clone()
    : _clone(value, [], [], true);
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function _arity(n, fn) {
  switch (n) {
    case 0:
      return function() {
        return fn.apply(this, arguments);
      };
    case 1:
      return function(a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function(a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function(a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function(a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function(a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function(a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function(a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function(a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error(
        'First argument to _arity must be a non-negative integer no greater than ten'
      );
  }
}

function _isPlaceholder(a) {
  return (
    a != null && typeof a === 'object' && a['@@functional/placeholder'] === true
  );
}

function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (
        combinedIdx < received.length &&
        (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)
      ) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0
      ? fn.apply(this, combined)
      : _arity(left, _curryN(length, combined, fn));
  };
}

function curryN(length, fn) {
  return _arity(length, _curryN(length, [], fn));
}

function curry(fn, ...args) {
  return curryN(fn.length, fn, ...args);
}

function delay(wait, func, ...args) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  return setTimeout(func, +wait || 0, ...args);
}

function debounce(wait, func, immediate = false) {
  let timeout;
  let result;
  const later = function(context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };
  const debounced = function(...args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(wait, later, this, args);
    }
    return result;
  };
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}

function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
}

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

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

function defer(func, ...args) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  var tick;
  if (typeof process === 'object' && typeof process.nextTick === 'function') {
    tick = process.nextTick;
  } else if (typeof Promise === 'function') {
    var resolve = Promise.resolve();
    tick = resolve.then.bind(resolve);
  } else if (typeof setImmediate === 'function') {
    tick = setImmediate;
  } else {
    tick = setTimeout;
  }
  tick(() => func(...args));
}

function escape(string) {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  const reUnescapedHtml = /[&<>"']/g;
  const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
  return string && reHasUnescapedHtml.test(string)
    ? string.replace(reUnescapedHtml, chr => htmlEscapes[chr])
    : string;
}

function _isArrayLike(x) {
  if (Array.isArray(x)) return true;
  if (!x) return false;
  if (typeof x !== 'object') return false;
  if (typeof x === 'string') return false;
  if (x.nodeType === 1) return !!x.length;
  if (x.length === 0) return true;
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
}

function flat(depth, list) {
  if (typeof depth !== 'number') {
    list = depth;
    depth = Number.MAX_VALUE;
  }
  var value, jlen, j;
  var result = [];
  var idx = 0;
  var ilen = list.length;
  while (idx < ilen) {
    if (_isArrayLike(list[idx])) {
      value = depth > 1 ? flat(depth - 1, list[idx]) : list[idx];
      j = 0;
      jlen = value.length;
      while (j < jlen) {
        result[result.length] = value[j];
        j += 1;
      }
    } else {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}

function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor);
}

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

function get(paths, obj) {
  if (is(String, paths)) {
    return path(paths.split('.'), obj);
  }
  return path(paths, obj);
}

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function hasPath(path, obj) {
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
}

function has(prop, obj) {
  return hasPath([prop], obj);
}

function includes(search, arr) {
  return arr.indexOf(search) !== -1;
}

function isEmpty(val) {
  if (val == null) return true;
  if ('boolean' == typeof val) return false;
  if ('number' == typeof val) return val === 0;
  if ('string' == typeof val) return val.length === 0;
  if ('function' == typeof val) return val.length === 0;
  if (Array.isArray(val)) return val.length === 0;
  if (val instanceof Error) return val.message === '';
  var has = Object.prototype.hasOwnProperty;
  var toString = Object.prototype.toString;
  if (val.toString == toString) {
    switch (val.toString()) {
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return val.size === 0;
      }
      case '[object Object]': {
        for (var key in val) {
          if (has.call(val, key)) return false;
        }
        return true;
      }
    }
  }
  return false;
}

const keys = Object.keys;

function memoize(fn) {
  let lastArgs = null;
  let lastResult = null;
  return function() {
    if (!areArgumentsShallowlyEqual(lastArgs, arguments)) {
      lastResult = fn.apply(null, arguments);
    }
    lastArgs = arguments;
    return lastResult;
  };
}
function areArgumentsShallowlyEqual(prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }
  const length = prev.length;
  for (let i = 0; i < length; i++) {
    if (prev[i] !== next[i]) {
      return false;
    }
  }
  return true;
}

function _isFunction(value) {
  return value != null && typeof value == 'function';
}

function _isObjectLike(value) {
  return value != null && typeof value == 'object';
}

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
  if (!_isObjectLike(target) && !_isFunction(target)) {
    target = {};
  }
  for (var key in source) {
    target[key] = _merge(target[key], source[key]);
  }
  return target;
}

function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }
  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
}

function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function() {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
}

function pick(names, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
}

function pipe(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => b(a(...args)));
}

function _round(methodName) {
  const func = Math[methodName];
  return (number, precision) => {
    precision = precision == null ? 0 : Math.min(precision, 292);
    if (precision) {
      let pair = `${number}e`.split('e');
      const value = func(`${pair[0]}e${+pair[1] + precision}`);
      pair = `${value}e`.split('e');
      return +`${pair[0]}e${+pair[1] - precision}`;
    }
    return func(number);
  };
}

function round(number, precision) {
  return _round('round')(number, precision);
}

function tap(fn, x) {
  fn(x);
  return x;
}

function throttle(wait, fn, options = {}) {
  let timeout, context, args, result;
  let previous = 0;
  const later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = fn.apply(context, args);
    if (!timeout) context = args = null;
  };
  const throttled = function() {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
  return throttled;
}

function unescape(string) {
  const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };
  const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
  const reHasEscapedHtml = RegExp(reEscapedHtml.source);
  return string && reHasEscapedHtml.test(string)
    ? string.replace(reEscapedHtml, entity => htmlUnescapes[entity])
    : string;
}

let idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return `${prefix}${id}`;
}

function values(obj) {
  var props = Object.keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }
  return vals;
}

function without(xs, list) {
  return list.filter(search => !includes(search, xs));
}

export { __, castArray, clamp, clone, compose, curry, curryN, debounce, defaultTo, defaultsDeep, defer, delay, escape, flat, get, has, hasPath, includes, is, isEmpty, isPlainObject, keys, memoize, merge, omit, once, path, pick, pipe, round, tap, throttle, type, unescape, uniqueId, values, without };
