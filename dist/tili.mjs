/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @name __
 * @constant
 * @since v0.8.0
 * @category Function
 * @example
 *
 *      const greet = replace('{name}', __, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
var __ = {'@@functional/placeholder': true};

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
    throw new Error(
      'min must not be greater than max in clamp(min, max, value)'
    );
  }
  return value < min ? min : value > max ? max : value;
}

function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
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
  return val === null
    ? 'Null'
    : val === undefined
      ? 'Undefined'
      : Object.prototype.toString.call(val).slice(8, -1);
}

/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */
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
      copiedValue[key] = deep ?
        _clone(value[key], refFrom, refTo, true) : value[key];
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':  return copy({});
    case 'Array':   return copy([]);
    case 'Date':    return new Date(value.valueOf());
    case 'RegExp':  return _cloneRegExp(value);
    default:        return value;
  }
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
  return value != null && typeof value.clone === 'function'
    ? value.clone()
    : _clone(value, [], [], true);
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
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
}

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (!_isPlaceholder(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
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
    return left <= 0 ? fn.apply(this, combined)
      : _arity(left, _curryN(length, combined, fn));
  };
}

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see curry
 * @example
 *
 *      const sumArgs = (...args) => sum(args);
 *
 *      const curriedAddFourNumbers = curryN(4, sumArgs);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */
function curryN(length, fn) {
  return _arity(length, _curryN(length, [], fn));
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
function curry(fn, ...args) {
  return curryN(fn.length, fn, ...args);
}

/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are
 * provided to `func` when it's invoked.
 *
 * @func
 * @since 0.4.0
 * @category Function
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Function} func The function to delay.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @return {number} Returns the timer id.
 * @example
 *
 *    delay(text => console.log(text), 1000, 'later')
 *    // => Logs 'later' after one second.
 */
function delay(wait, func, ...args) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  return setTimeout(func, +wait || 0, ...args);
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
 * @param  {Boolean} [immediate=false]
 * @return {Function}
 */
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
  if (typeof obj !== 'object' || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

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

/* eslint no-undef:0 */

/**
 * Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to func when it's invoked.
 *
 * @func
 * @since v0.4.0
 * @category Function
 * @param  {Function} func - Deferred function
 * @param {*} [args] Optional arguments
 * @see  https://github.com/jamiebuilds/tickedoff
 */
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

/* eslint quotes:0 */

/* Used to map characters to HTML entities. */
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

/* Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @func
 * @since 0.7.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @see escapeRegExp, unescape
 * @example
 *
 *    escape('fred, barney, & pebbles')
 *    // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  return string && reHasUnescapedHtml.test(string)
    ? string.replace(reUnescapedHtml, chr => htmlEscapes[chr])
    : string;
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

/**
 * Get a object value by a string dot path or array path.
 *
 * @func
 * @since v0.7.0
 * @category Object
 * @param  {String|Array} paths
 * @param  {Object} obj
 * @return {*}
 */
function get(paths, obj) {
  if (is(String, paths)) {
    return path(paths.split('.'), obj);
  }
  return path(paths, obj);
}

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @return {Boolean} Whether the path exists.
 * @see has
 * @example
 *
 *      hasPath(['a', 'b'], {a: {b: 2}});         // => true
 *      hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 *      hasPath(['a', 'b'], {a: {c: 2}});         // => false
 *      hasPath(['a', 'b'], {});                  // => false
 */
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

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @since v0.11.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      const hasName = curry(has)('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      const point = {x: 0, y: 0};
 *      const pointHas = curry(has)(__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */
function has(prop, obj) {
  return hasPath([prop], obj);
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

// https://github.com/ianstormtaylor/is-empty

var has$1 = Object.prototype.hasOwnProperty;
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
  if (val == null) return true;

  // Booleans...
  if ('boolean' == typeof val) return false;

  // Numbers...
  if ('number' == typeof val) return val === 0;

  // Strings...
  if ('string' == typeof val) return val.length === 0;

  // Functions...
  if ('function' == typeof val) return val.length === 0;

  // Arrays...
  if (Array.isArray(val)) return val.length === 0;

  // Errors...
  if (val instanceof Error) return val.message === '';

  // Objects...
  if (val.toString == toString) {
    switch (val.toString()) {
      // Maps, Sets, Files and Errors...
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return val.size === 0;
      }

      // Plain objects...
      case '[object Object]': {
        for (var key in val) {
          if (has$1.call(val, key)) return false;
        }

        return true;
      }
    }
  }

  // Anything else...
  return false;
}

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @since v0.11.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see values
 * @example
 *
 *      keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }

  if (typeof Object.keys === 'function') {
    return Object.keys(obj);
  }

  const keys = [];
  for (const prop in obj) {
    if (_has(prop, obj)) {
      keys[keys.length] = prop;
    }
  }
  return keys;
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
  if (!_isObjectLike(target) && !_isFunction(target)) {
    target = {};
  }
  for (var key in source) {
    target[key] = _merge(target[key], source[key]);
  }
  return target;
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
 * Pipes single-argument functions from left to right. The leftmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @func
 * @since v0.10.0
 * @category Function
 * @param {...Function} funcs - The functions to compose.
 * @return {Function} - A function obtained by composing the argument functions
 * from left to right. For example, pipe(f, g, h) is identical to doing
 * (...args) => h(g(f(...args))).
 */
function pipe(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => b(a(...args)));
}

/**
 * Creates a function like `round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @return {Function} Returns the new round function.
 */
function _round(methodName) {
  const func = Math[methodName];
  return (number, precision) => {
    precision = precision == null ? 0 : Math.min(precision, 292);
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${number}e`.split('e');
      const value = func(`${pair[0]}e${+pair[1] + precision}`);

      pair = `${value}e`.split('e');
      return +`${pair[0]}e${+pair[1] - precision}`;
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
 *    round(4.006)
 *    // => 4
 *
 *    round(4.006, 2)
 *    // => 4.01
 *
 *    round(4060, -2)
 *    // => 4100
 */

function round(number, precision) {
  return _round('round')(number, precision);
}

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
function tap(fn, x) {
  fn(x);
  return x;
}

/**
 * Throttle a function.
 *
 * @func
 * @since v0.2.0
 * @category Function
 * @param  {Number}   wait
 * @param  {Function} fn
 * @param  {Object}   [options]
 * @param  {Boolean}  [options.leading=true] - Trigger a leading function call.
 * @param  {Boolean}  [options.trailing=true] - Trigger a trailing function call.
 * @return {Function}
 */
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

/* eslint quotes:0 */

/* Used to map HTML entities to characters. */
const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
};

/* Used to match HTML entities and HTML characters. */
const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

/**
 * The inverse of `escape`this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to
 * their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional
 * HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @func
 * @since 0.7.0
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @return {string} Returns the unescaped string.
 * @see escape, escapeRegExp
 * @example
 *
 *    unescape('fred, barney, &amp; pebbles')
 *    // => 'fred, barney, & pebbles'
 */
function unescape(string) {
  return string && reHasEscapedHtml.test(string)
    ? string.replace(reEscapedHtml, entity => htmlUnescapes[entity])
    : string;
}

let idCounter = 0;

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
  return `${prefix}${id}`;
}

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @since v0.6.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @example
 *
 *      values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */
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

/**
 * Returns a new list without values in the first argument.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @since v0.11.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} xs The values to be removed from `list2`.
 * @param {Array} list The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @example
 *
 *      without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */
function without(xs, list) {
  return list.filter((search) => !includes(search, xs));
}

export { __, clamp, clone, compose, curry, curryN, debounce, defaultTo, defaultsDeep, defer, delay, escape, get, has, hasPath, includes, is, isEmpty, isPlainObject, keys, memoize, merge, omit, path, pick, pipe, round, tap, throttle, type, unescape, uniqueId, values, without };
