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
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      type({}); //=> "Object"
 *      type(1); //=> "Number"
 *      type(false); //=> "Boolean"
 *      type('s'); //=> "String"
 *      type(null); //=> "Null"
 *      type([]); //=> "Array"
 *      type(/[A-z]/); //=> "RegExp"
 *      type(() => {}); //=> "Function"
 *      type(undefined); //=> "Undefined"
 */
function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
}

/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @since v0.3.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      const objects = [{}, {}, {}];
 *      const objectsClone = clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */

function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
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

    default:
      return value;
  }
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @func
 * @since v0.1.0
 * @category Function
 * @param {...Function} funcs - The functions to compose.
 * @return {Function} - A function obtained by composing the argument functions
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
 *
 * @func
 * @since v0.1.0
 * @category Function
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
 *
 * @func
 * @since v0.1.0
 * @category Function
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
 *
 * @func
 * @since v0.1.0
 * @category Logic
 * @param  {*} d - The default value.
 * @param  {*} v - The passed value.
 * @return {*}
 */
function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
}

/**
 * Check if string or array includes the searched part.
 *
 * @func
 * @since v0.1.0
 * @category List
 * @param  {*} search
 * @param  {Array|String} arr
 * @return {Boolean}
 */
function includes(search, arr) {
  return arr.indexOf(search) !== -1;
}

/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @since v0.1.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} Ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      is(Object, {}); //=> true
 *      is(Number, 1); //=> true
 *      is(Object, 1); //=> false
 *      is(String, 's'); //=> true
 *      is(String, new String('')); //=> true
 *      is(Object, new String('')); //=> true
 *      is(Object, 's'); //=> false
 *      is(Number, {}); //=> false
 */
function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor);
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @since 0.1.0
 * @category Type
 * @param {*} obj The value to check.
 * @return {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * isPlainObject(new Foo)
 * // => false
 *
 * isPlainObject([1, 2, 3])
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 })
 * // => true
 *
 * isPlainObject(Object.create(null))
 * // => true
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
 *
 * @func
 * @since v0.1.0
 * @category Function
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
 * Retrieve the value at a given path.
 *
 * @func
 * @since v0.1.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} paths The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @example
 *
 *      path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      path(['a', 'b'], {c: {b: 2}}); //=> undefined
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
 *
 * @func
 * @since v0.2.0
 * @category Function
 * @param  {Function} fn
 * @param  {Number}   wait
 * @param  {Object}   options
 * @param  {Boolean} [options.leading=true] - Trigger a leading function call.
 * @param  {Boolean} [options.trailing=true] - Trigger a trailing function call.
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
/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @func
 * @since 0.1.0
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @return {string} Returns the unique ID.
 * @example
 *
 *      uniqueId('contact_');
 *      // => 'contact_104'
 *
 *      uniqueId();
 *      // => '105'
 */

function uniqueId(prefix) {
  var id = ++idCounter;
  return "".concat(prefix).concat(id);
}

exports.clone = clone;
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
exports.type = type;
exports.uniqueId = uniqueId;

Object.defineProperty(exports, '__esModule', { value: true });

})));
