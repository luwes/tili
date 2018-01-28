'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function appendOnce(parent, element) {
  parent = parent || document.body;
  return parent.contains(element) ? element : parent.appendChild(element);
}

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

function curry(fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return curryN.apply(void 0, [fn.length, fn].concat(args));
}

function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
}

function includes(search, arr) {
  return arr.indexOf(search) !== -1;
}

function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor);
}

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (_typeof(obj) !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

function memoize(func) {
  var lastArgs = null;
  var lastResult = null;
  return function () {
    if (!areArgumentsShallowlyEqual(lastArgs, arguments)) {
      lastResult = func.apply(null, arguments);
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

function qs(element, selector) {
  element = element || document;
  return element.querySelector(selector);
}

function qsa(element, selector) {
  element = element || document;
  return element.querySelectorAll(selector);
}

exports.appendOnce = appendOnce;
exports.curry = curry;
exports.curryN = curryN;
exports.defaultTo = defaultTo;
exports.includes = includes;
exports.is = is;
exports.isPlainObject = isPlainObject;
exports.memoize = memoize;
exports.path = path;
exports.qs = qs;
exports.qsa = qsa;
