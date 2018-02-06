(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.tili = {})));
}(this, (function (exports) { 'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var _sPO = Object.setPrototypeOf || function _sPO(o, p) {
  o.__proto__ = p;
  return o;
};

var _construct = typeof Reflect === "object" && Reflect.construct || function _construct(Parent, args, Class) {
  var Constructor,
      a = [null];
  a.push.apply(a, args);
  Constructor = Parent.bind.apply(Parent, a);
  return _sPO(new Constructor(), Class.prototype);
};

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs - The functions to compose.
 * @returns {Function} - A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
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

/**
 * Curry a function by argument length.
 * @param  {Number}    length
 * @param  {Function}  fn
 * @param  {...Function} args
 * @return {Function}
 */
function curryN(length, fn) {
  var _this = this;

  var _curry = function _curry(fnArgs) {
    if (fnArgs.length >= length) {
      return fn.apply(_this, fnArgs);
    }

    return function () {
      for (var _len2 = arguments.length, cArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        cArgs[_key2] = arguments[_key2];
      }

      return _curry(_toConsumableArray(fnArgs).concat(cArgs));
    };
  };

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return _curry(args);
}

/**
 * Curry a function.
 * @param  {Function} fn
 * @param  {...Function} args
 * @return {Function}
 */

function curry(fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return curryN.apply(void 0, [fn.length, fn].concat(args));
}

/**
 * Default to a value if the passed is null or undefined.
 * @param  {*} d - The default value.
 * @param  {*} v - The passed value.
 * @return {*}
 */
function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
}

/**
 * Check if string or array includes the searched part.
 * @param  {*} search
 * @param  {Array|String} arr
 * @return {Boolean}
 */
function includes(search, arr) {
  return arr.indexOf(search) !== -1;
}

/**
 * Check if a value is of a certain type.
 * @param  {*} Ctor - Constructor, can be built in types or user-defined.
 * @param  {*} val
 * @return {Boolean}
 */
function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor);
}

/**
 * @param {*} obj - The object to inspect.
 * @returns {Boolean} - True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (_typeof(obj) !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Memoize a function.
 * @param  {Function} fn
 * @return {*}
 */
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

/**
 * Get an object value by array paths.
 * @param  {string[]} paths
 * @param  {object} obj
 * @return {*}
 */
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

/**
 * Throttle a function.
 * @param  {Function} fn
 * @param  {Number}   wait
 * @param  {Object}   options
 * @param  {Boolean=true} options.leading - Trigger a leading function call.
 * @param  {Boolean=true} options.trailing - Trigger a trailing function call.
 * @return {Function}
 */
function throttle(fn, wait) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
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

var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return "".concat(prefix).concat(id);
}

exports.compose = compose;
exports.curry = curry;
exports.curryN = curryN;
exports.defaultTo = defaultTo;
exports.includes = includes;
exports.is = is;
exports.isPlainObject = isPlainObject;
exports.memoize = memoize;
exports.path = path;
exports.throttle = throttle;
exports.uniqueId = uniqueId;

Object.defineProperty(exports, '__esModule', { value: true });

})));
