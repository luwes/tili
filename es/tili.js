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
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @since v0.4.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} min The lower limit of the clamp (inclusive)
 * @param {Number} max The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      clamp(1, 10, -5) // => 1
 *      clamp(1, 10, 15) // => 10
 *      clamp(1, 10, 4)  // => 4
 */
function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }

  return value < min ? min : value > max ? max : value;
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
 *    type({}); //=> "Object"
 *    type(1); //=> "Number"
 *    type(false); //=> "Boolean"
 *    type('s'); //=> "String"
 *    type(null); //=> "Null"
 *    type([]); //=> "Array"
 *    type(/[A-z]/); //=> "RegExp"
 *    type(() => {}); //=> "Function"
 *    type(undefined); //=> "Undefined"
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
 *    const objects = [{}, {}, {}];
 *    const objectsClone = clone(objects);
 *    objects === objectsClone; //=> false
 *    objects[0] === objectsClone[0]; //=> false
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
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 *
 * @since 0.4.0
 * @category Function
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Function} func The function to delay.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @return {number} Returns the timer id.
 * @example
 *
 * delay(text => console.log(text), 1000, 'later')
 * // => Logs 'later' after one second.
 */
function delay(wait, func) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return setTimeout.apply(void 0, [func, +wait || 0].concat(args));
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @func
 * @since v0.4.0
 * @category Function
 * @param  {Number} wait - Amount of milliseconds
 * @param  {Function} func
 * @param  {Boolean} immediate
 * @return {Function}
 */

function debounce(wait, func, immediate) {
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

/* eslint no-undef:0 */
var tick;

if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && typeof process.nextTick === 'function') {
  tick = process.nextTick;
} else if (typeof Promise === 'function') {
  var resolve = Promise.resolve();
  tick = resolve.then.bind(resolve);
} else if (typeof setImmediate === 'function') {
  tick = setImmediate;
} else {
  tick = setTimeout;
}
/**
 * Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to func when it's invoked.
 *
 * @func
 * @since v0.4.0
 * @category Function
 * @param  {Function} func - deferred function
 * @return {Promise} defer promise
 * @see  https://github.com/jamiebuilds/tickedoff
 */


function defer(func) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }

  return tick(function () {
    return func.apply(null, args);
  });
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
 *    is(Object, {}); //=> true
 *    is(Number, 1); //=> true
 *    is(Object, 1); //=> false
 *    is(String, 's'); //=> true
 *    is(String, new String('')); //=> true
 *    is(Object, new String('')); //=> true
 *    is(Object, 's'); //=> false
 *    is(Number, {}); //=> false
 */
function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor);
}

// https://github.com/ianstormtaylor/is-empty
var has = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @since v0.4.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} val
 * @return {Boolean}
 * @example
 *
 *      isEmpty([1, 2, 3]);   //=> false
 *      isEmpty([]);          //=> true
 *      isEmpty('');          //=> true
 *      isEmpty(null);        //=> true
 *      isEmpty({});          //=> true
 *      isEmpty({length: 0}); //=> false
 */

function isEmpty(val) {
  // Null and Undefined...
  if (val == null) return true; // Booleans...

  if ('boolean' == typeof val) return false; // Numbers...

  if ('number' == typeof val) return val === 0; // Strings...

  if ('string' == typeof val) return val.length === 0; // Functions...

  if ('function' == typeof val) return val.length === 0; // Arrays...

  if (Array.isArray(val)) return val.length === 0; // Errors...

  if (val instanceof Error) return val.message === ''; // Objects...

  if (val.toString == toString) {
    switch (val.toString()) {
      // Maps, Sets, Files and Errors...
      case '[object File]':
      case '[object Map]':
      case '[object Set]':
        {
          return val.size === 0;
        }
      // Plain objects...

      case '[object Object]':
        {
          for (var key in val) {
            if (has.call(val, key)) return false;
          }

          return true;
        }
    }
  } // Anything else...


  return false;
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
 *    function Foo() {
 *      this.a = 1
 *    }
 *
 *    isPlainObject(new Foo)
 *    // => false
 *
 *    isPlainObject([1, 2, 3])
 *    // => false
 *
 *    isPlainObject({ 'x': 0, 'y': 0 })
 *    // => true
 *
 *    isPlainObject(Object.create(null))
 *    // => true
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

  return clone$1(source);
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
  Object.keys(source).forEach(function (key) {
    if (isPlainObject(source[key]) || Array.isArray(source[key])) {
      target[key] = _merge(target[key], source[key]);
    } else if (!isUndefinedSource(target[key], source[key])) {
      target[key] = clone$1(source[key]);
    }
  });
  return target;
}

function isUndefinedSource(target, source) {
  return target && source === undefined;
}

function clone$1(source) {
  if (isPlainObject(source)) {
    return _merge(emptyTarget(source), source);
  }

  return source;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @since v0.3.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see pick
 * @example
 *
 *    omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */
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
 *    path(['a', 'b'], {a: {b: 2}}); //=> 2
 *    path(['a', 'b'], {c: {b: 2}}); //=> undefined
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
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @since v0.3.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see omit
 * @example
 *
 *    pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *    pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */
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

/**
 * Creates a function like `round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @return {Function} Returns the new round function.
 */
function _round(methodName) {
  var func = Math[methodName];
  return function (number, precision) {
    precision = precision == null ? 0 : Math.min(precision, 292);

    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      var pair = "".concat(number, "e").split('e');
      var value = func("".concat(pair[0], "e").concat(+pair[1] + precision));
      pair = "".concat(value, "e").split('e');
      return +"".concat(pair[0], "e").concat(+pair[1] - precision);
    }

    return func(number);
  };
}

/**
 * Computes `number` rounded to `precision`.
 *
 * @func
 * @since 0.4.0
 * @category Math
 * @param {number} number The number to round.
 * @param {number} [precision=0] The precision to round to.
 * @returns {number} Returns the rounded number.
 * @example
 *
 * round(4.006)
 * // => 4
 *
 * round(4.006, 2)
 * // => 4.01
 *
 * round(4060, -2)
 * // => 4100
 */

var round = _round('round');

/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * @func
 * @since v0.3.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`.
 * The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *    const sayX = x => console.log('x is ' + x);
 *    tap(sayX, 100); //=> 100
 *    // logs 'x is 100'
 *
 * @symb tap(f, a) = a
 */

var tap = curryN(2, function (fn, x) {
  fn(x);
  return x;
});

/**
 * Throttle a function.
 *
 * @func
 * @since v0.2.0
 * @category Function
 * @param  {Number}   wait
 * @param  {Function} fn
 * @param  {Object}   options
 * @param  {Boolean} [options.leading=true] - Trigger a leading function call.
 * @param  {Boolean} [options.trailing=true] - Trigger a trailing function call.
 * @return {Function}
 */
function throttle(wait, fn) {
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
 *    uniqueId('contact_');
 *    // => 'contact_104'
 *
 *    uniqueId();
 *    // => '105'
 */

function uniqueId(prefix) {
  var id = ++idCounter;
  return "".concat(prefix).concat(id);
}

export { clamp, clone, compose, curry, curryN, debounce, defaultTo, defer, delay, includes, is, isEmpty, isPlainObject, memoize, merge, omit, path, pick, round, tap, throttle, type, uniqueId };
