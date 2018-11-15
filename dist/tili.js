(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.tili = {})));
}(this, (function (exports) { 'use strict';

  var __ = {
    '@@functional/placeholder': true
  };

  function _isPlaceholder(a) {
    return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
  }

  function _curry1(fn) {
    return function f1(a) {
      if (arguments.length === 0 || _isPlaceholder(a)) {
        return f1;
      } else {
        return fn.apply(this, arguments);
      }
    };
  }

  var castArray = _curry1(function castArray(value) {
    return Array.isArray(value) ? value.slice(0) : [value];
  });

  function _curry2(fn) {
    return function f2(a, b) {
      switch (arguments.length) {
        case 0:
          return f2;
        case 1:
          return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
            return fn(a, _b);
          });
        default:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
            return fn(_a, b);
          }) : _isPlaceholder(b) ? _curry1(function (_b) {
            return fn(a, _b);
          }) : fn(a, b);
      }
    };
  }

  function _curry3(fn) {
    return function f3(a, b, c) {
      switch (arguments.length) {
        case 0:
          return f3;
        case 1:
          return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
            return fn(a, _b, _c);
          });
        case 2:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
            return fn(_a, b, _c);
          }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
            return fn(a, _b, _c);
          }) : _curry1(function (_c) {
            return fn(a, b, _c);
          });
        default:
          return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
            return fn(_a, _b, c);
          }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
            return fn(_a, b, _c);
          }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
            return fn(a, _b, _c);
          }) : _isPlaceholder(a) ? _curry1(function (_a) {
            return fn(_a, b, c);
          }) : _isPlaceholder(b) ? _curry1(function (_b) {
            return fn(a, _b, c);
          }) : _isPlaceholder(c) ? _curry1(function (_c) {
            return fn(a, b, _c);
          }) : fn(a, b, c);
      }
    };
  }

  var clamp = _curry3(function clamp(min, max, value) {
    if (min > max) {
      throw new Error('min must not be greater than max in clamp(min, max, value)');
    }
    return value < min ? min : value > max ? max : value;
  });

  function _cloneRegExp(pattern) {
    return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
  }

  var type = _curry1(function type(val) {
    return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
  });

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

  var clone = _curry1(function clone(value) {
    return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
  });

  function compose() {
    for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }
    if (fns.length === 0) {
      return function (arg) {
        return arg;
      };
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return fns.reduce(function (a, b) {
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

  var defaultTo = _curry2(function defaultTo(def, value) {
    return value == null || value !== value ? def : value;
  });

  var escape = _curry1(function escape(string) {
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
  });

  var flat = _curry2(function flat(depth, arr) {
    return depth === 0 ? arr : arr.reduce(function (acc, val) {
      return Array.isArray(val) ? acc.concat(flat(depth - 1, val)) : acc.concat(val);
    }, []);
  });

  var flatten = _curry1(function flatten(list) {
    return flat(Infinity, list);
  });

  var is = _curry2(function is(Ctor, value) {
    return value != null && (value.constructor === Ctor || value instanceof Ctor);
  });

  var path = _curry2(function path(paths, obj) {
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
  });

  var get = _curry2(function get(paths, obj) {
    if (is(String, paths)) {
      return path(paths.split('.'), obj);
    }
    return path(paths, obj);
  });

  function _has(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var hasPath = _curry2(function hasPath(path, obj) {
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
  });

  var has = _curry2(function has(prop, obj) {
    return hasPath([prop], obj);
  });

  var includes = _curry2(function includes(search, arr) {
    return arr.indexOf(search) !== -1;
  });

  var isEmpty = _curry1(function isEmpty(val) {
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
  });

  var isPlainObject = _curry1(function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
  });

  var keys = _curry1(Object.keys);

  var memoize = _curry1(function memoize(fn) {
    var lastArgs = null;
    var lastResult = null;
    return function () {
      if (!areArgumentsShallowlyEqual(lastArgs, arguments)) {
        lastResult = fn.apply(null, arguments);
      }
      lastArgs = arguments;
      return lastResult;
    };
  });
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

  var omit = _curry2(function omit(names, obj) {
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
  });

  var once = _curry1(function once(fn) {
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
  });

  var pick = _curry2(function pick(names, obj) {
    var result = {};
    var idx = 0;
    while (idx < names.length) {
      if (names[idx] in obj) {
        result[names[idx]] = obj[names[idx]];
      }
      idx += 1;
    }
    return result;
  });

  function pipe() {
    for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }
    if (fns.length === 0) {
      return function (arg) {
        return arg;
      };
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return fns.reduce(function (a, b) {
      return function () {
        return b(a.apply(void 0, arguments));
      };
    });
  }

  function _round(methodName) {
    var fn = Math[methodName];
    return function (precision, number) {
      precision = precision == null ? 0 : Math.min(precision, 292);
      if (precision) {
        var pair = (number + "e").split('e');
        var value = fn(pair[0] + "e" + (+pair[1] + precision));
        pair = (value + "e").split('e');
        return +(pair[0] + "e" + (+pair[1] - precision));
      }
      return fn(number);
    };
  }

  var round = _curry2(function round(precision, number) {
    return _round('round')(precision, number);
  });

  var tap = _curry2(function tap(fn, x) {
    fn(x);
    return x;
  });

  var unescape = _curry1(function unescape(string) {
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
  });

  var idCounter = 0;
  var uniqueId = _curry1(function uniqueId(prefix) {
    var id = ++idCounter;
    return "" + prefix + id;
  });

  var values = _curry1(function values(obj) {
    return Object.keys(obj).map(function (i) {
      return obj[i];
    });
  });

  var without = _curry2(function without(xs, list) {
    return list.filter(function (search) {
      return !includes(search, xs);
    });
  });

  exports.__ = __;
  exports.castArray = castArray;
  exports.clamp = clamp;
  exports.clone = clone;
  exports.compose = compose;
  exports.curry = curry;
  exports.curryN = curryN;
  exports.defaultTo = defaultTo;
  exports.escape = escape;
  exports.flat = flat;
  exports.flatten = flatten;
  exports.get = get;
  exports.has = has;
  exports.hasPath = hasPath;
  exports.includes = includes;
  exports.is = is;
  exports.isEmpty = isEmpty;
  exports.isPlainObject = isPlainObject;
  exports.keys = keys;
  exports.memoize = memoize;
  exports.omit = omit;
  exports.once = once;
  exports.path = path;
  exports.pick = pick;
  exports.pipe = pipe;
  exports.round = round;
  exports.tap = tap;
  exports.type = type;
  exports.unescape = unescape;
  exports.uniqueId = uniqueId;
  exports.values = values;
  exports.without = without;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
