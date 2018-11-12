(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.tili = {})));
}(this, (function (exports) { 'use strict';

  var __ = {
    '@@functional/placeholder': true
  };

  function castArray() {
    if (!arguments.length) {
      return [];
    }
    var value = arguments[0];
    return Array.isArray(value) ? value : [value];
  }

  function clamp(min, max, value) {
    if (min > max) {
      throw new Error('min must not be greater than max in clamp(min, max, value)');
    }
    return value < min ? min : value > max ? max : value;
  }

  function _cloneRegExp(pattern) {
    return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
  }

  function type(val) {
    return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
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
        copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
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
    return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
  }

  function compose() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
      return function (arg) {
        return arg;
      };
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce(function (a, b) {
      return function () {
        return a(b.apply(void 0, arguments));
      };
    });
  }

  function _arity(n, fn) {
    switch (n) {
      case 0:
        return function () {
          return fn.apply(this, arguments);
        };
      case 1:
        return function (a0) {
          return fn.apply(this, arguments);
        };
      case 2:
        return function (a0, a1) {
          return fn.apply(this, arguments);
        };
      case 3:
        return function (a0, a1, a2) {
          return fn.apply(this, arguments);
        };
      case 4:
        return function (a0, a1, a2, a3) {
          return fn.apply(this, arguments);
        };
      case 5:
        return function (a0, a1, a2, a3, a4) {
          return fn.apply(this, arguments);
        };
      case 6:
        return function (a0, a1, a2, a3, a4, a5) {
          return fn.apply(this, arguments);
        };
      case 7:
        return function (a0, a1, a2, a3, a4, a5, a6) {
          return fn.apply(this, arguments);
        };
      case 8:
        return function (a0, a1, a2, a3, a4, a5, a6, a7) {
          return fn.apply(this, arguments);
        };
      case 9:
        return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
          return fn.apply(this, arguments);
        };
      case 10:
        return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return fn.apply(this, arguments);
        };
      default:
        throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
    }
  }

  function _isPlaceholder(a) {
    return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
  }

  function _curryN(length, received, fn) {
    return function () {
      var combined = [];
      var argsIdx = 0;
      var left = length;
      var combinedIdx = 0;
      while (combinedIdx < received.length || argsIdx < arguments.length) {
        var result;
        if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
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
      return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
    };
  }

  function curryN(length, fn) {
    return _arity(length, _curryN(length, [], fn));
  }

  function curry(fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return curryN.apply(void 0, [fn.length, fn].concat(args));
  }

  function delay(wait, func) {
    if (typeof func != 'function') {
      throw new TypeError('Expected a function');
    }
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return setTimeout.apply(void 0, [func, +wait || 0].concat(args));
  }

  function debounce(wait, func, immediate) {
    if (immediate === void 0) {
      immediate = false;
    }
    var timeout;
    var result;
    var later = function later(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };
    var debounced = function debounced() {
      if (timeout) clearTimeout(timeout);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = delay(wait, later, this, args);
      }
      return result;
    };
    debounced.cancel = function () {
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
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
  }

  function defaultsDeep(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }
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

  function defer(func) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
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
    tick(function () {
      return func.apply(void 0, args);
    });
  }

  function escape(string) {
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    var reUnescapedHtml = /[&<>"']/g;
    var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, function (chr) {
      return htmlEscapes[chr];
    }) : string;
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
    var val = obj;
    var idx = 0;
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
        case '[object Set]':
          {
            return val.size === 0;
          }
        case '[object Object]':
          {
            for (var key in val) {
              if (has.call(val, key)) return false;
            }
            return true;
          }
      }
    }
    return false;
  }

  var keys = Object.keys;

  function memoize(fn) {
    var lastArgs = null;
    var lastResult = null;
    return function () {
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
    var length = prev.length;
    for (var i = 0; i < length; i++) {
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

  function merge(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }
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
    return _arity(fn.length, function () {
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

  function pipe() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
      return function (arg) {
        return arg;
      };
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce(function (a, b) {
      return function () {
        return b(a.apply(void 0, arguments));
      };
    });
  }

  function _round(methodName) {
    var func = Math[methodName];
    return function (number, precision) {
      precision = precision == null ? 0 : Math.min(precision, 292);
      if (precision) {
        var pair = (number + "e").split('e');
        var value = func(pair[0] + "e" + (+pair[1] + precision));
        pair = (value + "e").split('e');
        return +(pair[0] + "e" + (+pair[1] - precision));
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

  function throttle(wait, fn, options) {
    if (options === void 0) {
      options = {};
    }
    var timeout, context, args, result;
    var previous = 0;
    var later = function later() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = fn.apply(context, args);
      if (!timeout) context = args = null;
    };
    var throttled = function throttled() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
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
    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };
    return throttled;
  }

  function unescape(string) {
    var htmlUnescapes = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'"
    };
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
    var reHasEscapedHtml = RegExp(reEscapedHtml.source);
    return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, function (entity) {
      return htmlUnescapes[entity];
    }) : string;
  }

  var idCounter = 0;
  function uniqueId(prefix) {
    var id = ++idCounter;
    return "" + prefix + id;
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
    return list.filter(function (search) {
      return !includes(search, xs);
    });
  }

  exports.__ = __;
  exports.castArray = castArray;
  exports.clamp = clamp;
  exports.clone = clone;
  exports.compose = compose;
  exports.curry = curry;
  exports.curryN = curryN;
  exports.debounce = debounce;
  exports.defaultTo = defaultTo;
  exports.defaultsDeep = defaultsDeep;
  exports.defer = defer;
  exports.delay = delay;
  exports.escape = escape;
  exports.flat = flat;
  exports.get = get;
  exports.has = has;
  exports.hasPath = hasPath;
  exports.includes = includes;
  exports.is = is;
  exports.isEmpty = isEmpty;
  exports.isPlainObject = isPlainObject;
  exports.keys = keys;
  exports.memoize = memoize;
  exports.merge = merge;
  exports.omit = omit;
  exports.once = once;
  exports.path = path;
  exports.pick = pick;
  exports.pipe = pipe;
  exports.round = round;
  exports.tap = tap;
  exports.throttle = throttle;
  exports.type = type;
  exports.unescape = unescape;
  exports.uniqueId = uniqueId;
  exports.values = values;
  exports.without = without;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
