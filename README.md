# 🌴ili

[![Build Status](https://img.shields.io/travis/luwes/tili/master.svg?style=flat-square&label=Travis+CI)](https://travis-ci.org/luwes/tili)
[![codecov](https://img.shields.io/codecov/c/github/luwes/tili.svg?style=flat-square&version=$VERSION)](https://codecov.io/gh/luwes/tili)
![Badge size](http://img.badgesize.io/luwes/tili/master/dist/tili.min.js.svg?style=flat-square&compression=gzip&version=$VERSION)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Small javascript utilities.

- Tiny 🦎 in size.
- 100% tree-shakeable 🥥!
- Curried 🍛 by default.

## Install

```bash
$ npm install tili
```

or from a CDN:

```html
<script src="//unpkg.com/tili@latest/dist/tili.min.js"></script>
```

## Usage

```js
import * as _ from 'tili';
```

or

```js
import { get, compose, merge } from 'tili';
```

## API

<a name="tili"></a>

### tili : <code>object</code>

**Kind**: global namespace

- [tili](#tili) : <code>object</code>
  - _Function_
    - [.compose(...fns)](#tili.compose) ⇒ <code>function</code>
    - [.curry(fn, ...args)](#tili.curry) ⇒ <code>function</code>
    - [.curryN(length, fn)](#tili.curryN) ⇒ <code>function</code>
    - [.memoize(fn)](#tili.memoize) ⇒ <code>\*</code>
    - [.once(fn)](#tili.once) ⇒ <code>function</code>
    - [.pipe(...fns)](#tili.pipe) ⇒ <code>function</code>
    - [.tap(fn, x)](#tili.tap) ⇒ <code>\*</code>
  - _List_
    - [.flat(depth, arr)](#tili.flat) ⇒ <code>Array</code>
    - [.flatten(list)](#tili.flatten) ⇒ <code>Array</code>
    - [.includes(search, arr)](#tili.includes) ⇒ <code>Boolean</code>
    - [.without(xs, list)](#tili.without) ⇒ <code>Array</code>
  - _Logic_
    - [.defaultTo(def, value)](#tili.defaultTo) ⇒ <code>\*</code>
    - [.isEmpty(val)](#tili.isEmpty) ⇒ <code>Boolean</code>
  - _Math_
    - [.round(precision, number)](#tili.round) ⇒ <code>number</code>
  - _Object_
    - [.clone(value)](#tili.clone) ⇒ <code>\*</code>
    - [.get(paths, obj)](#tili.get) ⇒ <code>\*</code>
    - [.has(prop, obj)](#tili.has) ⇒ <code>Boolean</code>
    - [.hasPath(path, obj)](#tili.hasPath) ⇒ <code>Boolean</code>
    - [.keys(obj)](#tili.keys) ⇒ <code>Array</code>
    - [.omit(names, obj)](#tili.omit) ⇒ <code>Object</code>
    - [.path(paths, obj)](#tili.path) ⇒ <code>\*</code>
    - [.pick(names, obj)](#tili.pick) ⇒ <code>Object</code>
    - [.values(obj)](#tili.values) ⇒ <code>Array</code>
  - _Relation_
    - [.clamp(min, max, value)](#tili.clamp) ⇒ <code>Number</code>
  - _String_
    - [.escape([string])](#tili.escape) ⇒ <code>string</code>
    - [.unescape([string])](#tili.unescape) ⇒ <code>string</code>
  - _Type_
    - [.castArray](#tili.castArray) ⇒ <code>Array</code>
    - [.is(Ctor, value)](#tili.is) ⇒ <code>Boolean</code>
    - [.isPlainObject(obj)](#tili.isPlainObject) ⇒ <code>boolean</code>
    - [.type(val)](#tili.type) ⇒ <code>String</code>
  - _Util_
    - [.uniqueId(prefix)](#tili.uniqueId) ⇒ <code>string</code>

---

<a name="tili.compose"></a>

#### \_.compose(...fns) ⇒ <code>function</code>

Composes single-argument functions from right to left. The rightmost
function can take multiple arguments as it provides the signature for
the resulting composite function.

**Note:** The result of compose is not automatically curried.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>function</code> - A function obtained by composing the argument functions
from right to left. For example, compose(f, g, h) is identical to doing
(...args) => f(g(h(...args))).  
**Category**: Function  
**Since**: v0.1.0

| Param  | Type                  | Description               |
| ------ | --------------------- | ------------------------- |
| ...fns | <code>function</code> | The functions to compose. |

---

<a name="tili.curry"></a>

#### \_.curry(fn, ...args) ⇒ <code>function</code>

Curry a function.

**Kind**: static method of [<code>tili</code>](#tili)  
**Category**: Function  
**Since**: v0.1.0

| Param   | Type                  |
| ------- | --------------------- |
| fn      | <code>function</code> |
| ...args | <code>function</code> |

---

<a name="tili.curryN"></a>

#### \_.curryN(length, fn) ⇒ <code>function</code>

Returns a curried equivalent of the provided function, with the specified
arity. The curried function has two unusual capabilities. First, its
arguments needn't be provided one at a time. If `g` is `curryN(3, f)`, the
following are equivalent:

- `g(1)(2)(3)`
- `g(1)(2, 3)`
- `g(1, 2)(3)`
- `g(1, 2, 3)`

Secondly, the special placeholder value [`__`](#__) may be used to specify
"gaps", allowing partial application of any combination of arguments,
regardless of their positions. If `g` is as above and `_` is [`__`](#__),
the following are equivalent:

- `g(1, 2, 3)`
- `g(_, 2, 3)(1)`
- `g(_, _, 3)(1)(2)`
- `g(_, _, 3)(1, 2)`
- `g(_, 2)(1)(3)`
- `g(_, 2)(1, 3)`
- `g(_, 2)(_, 3)(1)`

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>function</code> - A new, curried function.  
**Category**: Function  
**Sig**: Number -> (_ -> a) -> (_ -> a)  
**See**: curry  
**Since**: v0.1.0

| Param  | Type                  | Description                          |
| ------ | --------------------- | ------------------------------------ |
| length | <code>Number</code>   | The arity for the returned function. |
| fn     | <code>function</code> | The function to curry.               |

**Example**

```js
const sumArgs = (...args) => sum(args);

const curriedAddFourNumbers = curryN(4, sumArgs);
const f = curriedAddFourNumbers(1, 2);
const g = f(3);
g(4); //=> 10
```

---

<a name="tili.memoize"></a>

#### \_.memoize(fn) ⇒ <code>\*</code>

Memoize a function.

**Kind**: static method of [<code>tili</code>](#tili)  
**Category**: Function  
**Since**: v0.1.0

| Param | Type                  |
| ----- | --------------------- |
| fn    | <code>function</code> |

---

<a name="tili.once"></a>

#### \_.once(fn) ⇒ <code>function</code>

Accepts a function `fn` and returns a function that guards invocation of
`fn` such that `fn` can only ever be called once, no matter how many times
the returned function is invoked. The first value calculated is returned in
subsequent invocations.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>function</code> - The wrapped function.  
**Category**: Function  
**Sig**: (a... -> b) -> (a... -> b)  
**Since**: v0.12.0

| Param | Type                  | Description                                       |
| ----- | --------------------- | ------------------------------------------------- |
| fn    | <code>function</code> | The function to wrap in a call-only-once wrapper. |

**Example**

```js
const addOneOnce = once(x => x + 1);
addOneOnce(10); //=> 11
addOneOnce(addOneOnce(50)); //=> 11
```

---

<a name="tili.pipe"></a>

#### \_.pipe(...fns) ⇒ <code>function</code>

Pipes single-argument functions from left to right. The leftmost
function can take multiple arguments as it provides the signature for
the resulting composite function.

**Note:** The result of pipe is not automatically curried.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>function</code> - - A function obtained by composing the argument functions
from left to right. For example, pipe(f, g, h) is identical to doing
(...args) => h(g(f(...args))).  
**Category**: Function  
**Since**: v0.10.0

| Param  | Type                  | Description               |
| ------ | --------------------- | ------------------------- |
| ...fns | <code>function</code> | The functions to compose. |

---

<a name="tili.tap"></a>

#### \_.tap(fn, x) ⇒ <code>\*</code>

Runs the given function with the supplied object, then returns the object.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>\*</code> - `x`.  
**Category**: Function  
**Sig**: (a -> \*) -> a -> a  
**Symb**: tap(f, a) = a  
**Since**: v0.3.0

| Param | Type                  | Description                                                                  |
| ----- | --------------------- | ---------------------------------------------------------------------------- |
| fn    | <code>function</code> | The function to call with `x`. The return value of `fn` will be thrown away. |
| x     | <code>\*</code>       |                                                                              |

**Example**

```js
const sayX = x => console.log('x is ' + x);
tap(sayX, 100); //=> 100
// logs 'x is 100'
```

---

<a name="tili.flat"></a>

#### \_.flat(depth, arr) ⇒ <code>Array</code>

Returns a new array by pulling every item out of it (and all its sub-arrays)
and putting them in a new array, depth-first.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Array</code> - The flattened array.  
**Category**: List  
**Sig**: [a] -> [b]  
**Since**: v0.12.0

| Param | Type                | Description              |
| ----- | ------------------- | ------------------------ |
| depth | <code>Number</code> | The flatten depth level. |
| arr   | <code>Array</code>  | The array to consider.   |

**Example**

```js
flat(10, [1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
//=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

---

<a name="tili.flatten"></a>

#### \_.flatten(list) ⇒ <code>Array</code>

Returns a new list by pulling every item out of it (and all its sub-arrays)
and putting them in a new array, depth-first.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Array</code> - The flattened list.  
**Category**: List  
**Sig**: [a] -> [b]  
**Since**: v0.13.0

| Param | Type               | Description            |
| ----- | ------------------ | ---------------------- |
| list  | <code>Array</code> | The array to consider. |

**Example**

```js
flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
//=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

---

<a name="tili.includes"></a>

#### \_.includes(search, arr) ⇒ <code>Boolean</code>

Check if string or array includes the searched part.

**Kind**: static method of [<code>tili</code>](#tili)  
**Category**: List  
**Since**: v0.1.0

| Param  | Type                                      |
| ------ | ----------------------------------------- |
| search | <code>\*</code>                           |
| arr    | <code>Array</code> \| <code>String</code> |

---

<a name="tili.without"></a>

#### \_.without(xs, list) ⇒ <code>Array</code>

Returns a new list without values in the first argument.

Acts as a transducer if a transformer is given in list position.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Array</code> - The new array without values in `list1`.  
**Category**: List  
**Sig**: [a] -> [a] -> [a]  
**Since**: v0.11.0

| Param | Type               | Description                            |
| ----- | ------------------ | -------------------------------------- |
| xs    | <code>Array</code> | The values to be removed from `list2`. |
| list  | <code>Array</code> | The array to remove values from.       |

**Example**

```js
without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
```

---

<a name="tili.defaultTo"></a>

#### \_.defaultTo(def, value) ⇒ <code>\*</code>

Default to a value if the passed is null or undefined.

**Kind**: static method of [<code>tili</code>](#tili)  
**Category**: Logic  
**Since**: v0.1.0

| Param | Type            | Description        |
| ----- | --------------- | ------------------ |
| def   | <code>\*</code> | The default value. |
| value | <code>\*</code> | The passed value.  |

---

<a name="tili.isEmpty"></a>

#### \_.isEmpty(val) ⇒ <code>Boolean</code>

Returns `true` if the given value is its type's empty value; `false`
otherwise.

**Kind**: static method of [<code>tili</code>](#tili)  
**Category**: Logic  
**Sig**: a -> Boolean  
**Since**: v0.4.0

| Param | Type            |
| ----- | --------------- |
| val   | <code>\*</code> |

**Example**

```js
isEmpty([1, 2, 3]); //=> false
isEmpty([]); //=> true
isEmpty(''); //=> true
isEmpty(null); //=> true
isEmpty({}); //=> true
isEmpty({ length: 0 }); //=> false
```

---

<a name="tili.round"></a>

#### \_.round(precision, number) ⇒ <code>number</code>

Computes `number` rounded to `precision`.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>number</code> - Returns the rounded number.  
**Category**: Math  
**Since**: 0.4.0

| Param     | Type                | Description                |
| --------- | ------------------- | -------------------------- |
| precision | <code>number</code> | The precision to round to. |
| number    | <code>number</code> | The number to round.       |

**Example**

```js
round(0, 4.006);
// => 4

round(2, 4.006);
// => 4.01

round(-2, 4060);
// => 4100
```

---

<a name="tili.clone"></a>

#### \_.clone(value) ⇒ <code>\*</code>

Creates a deep copy of the value which may contain (nested) `Array`s and
`Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
assigned by reference rather than copied

Dispatches to a `clone` method if present.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>\*</code> - A deeply cloned copy of `val`  
**Category**: Object  
**Sig**: <code>\*</code> -> {\*}  
**Since**: v0.3.0

| Param | Type            | Description                  |
| ----- | --------------- | ---------------------------- |
| value | <code>\*</code> | The object or array to clone |

**Example**

```js
const objects = [{}, {}, {}];
const objectsClone = clone(objects);
objects === objectsClone; //=> false
objects[0] === objectsClone[0]; //=> false
```

---

<a name="tili.get"></a>

#### \_.get(paths, obj) ⇒ <code>\*</code>

Get a object value by a string dot path or array path.

**Kind**: static method of [<code>tili</code>](#tili)  
**Category**: Object  
**Since**: v0.7.0

| Param | Type                                      |
| ----- | ----------------------------------------- |
| paths | <code>String</code> \| <code>Array</code> |
| obj   | <code>Object</code>                       |

---

<a name="tili.has"></a>

#### \_.has(prop, obj) ⇒ <code>Boolean</code>

Returns whether or not an object has an own property with the specified name

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Boolean</code> - Whether the property exists.  
**Category**: Object  
**Sig**: s -> {s: x} -> Boolean  
**Since**: v0.11.0

| Param | Type                | Description                            |
| ----- | ------------------- | -------------------------------------- |
| prop  | <code>String</code> | The name of the property to check for. |
| obj   | <code>Object</code> | The object to query.                   |

**Example**

```js
const hasName = has('name');
hasName({ name: 'alice' }); //=> true
hasName({ name: 'bob' }); //=> true
hasName({}); //=> false

const point = { x: 0, y: 0 };
const pointHas = has(__, point);
pointHas('x'); //=> true
pointHas('y'); //=> true
pointHas('z'); //=> false
```

---

<a name="tili.hasPath"></a>

#### \_.hasPath(path, obj) ⇒ <code>Boolean</code>

Returns whether or not a path exists in an object. Only the object's
own properties are checked.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Boolean</code> - Whether the path exists.  
**Category**: Object  
**Typedefn**: Idx = String | Int  
**Sig**: [Idx] -> {a} -> Boolean  
**See**: has  
**Since**: v0.11.0

| Param | Type                | Description                      |
| ----- | ------------------- | -------------------------------- |
| path  | <code>Array</code>  | The path to use.                 |
| obj   | <code>Object</code> | The object to check the path in. |

**Example**

```js
hasPath(['a', 'b'], { a: { b: 2 } }); // => true
hasPath(['a', 'b'], { a: { b: undefined } }); // => true
hasPath(['a', 'b'], { a: { c: 2 } }); // => false
hasPath(['a', 'b'], {}); // => false
```

---

<a name="tili.keys"></a>

#### \_.keys(obj) ⇒ <code>Array</code>

Returns a list containing the names of all the enumerable own properties of
the supplied object.
Note that the order of the output array is not guaranteed to be consistent
across different JS platforms.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Array</code> - An array of the object's own properties.  
**Category**: Object  
**Sig**: <code>k: v</code> -> [k]  
**See**: values  
**Since**: v0.11.0

| Param | Type                | Description                           |
| ----- | ------------------- | ------------------------------------- |
| obj   | <code>Object</code> | The object to extract properties from |

**Example**

```js
keys({ a: 1, b: 2, c: 3 }); //=> ['a', 'b', 'c']
```

---

<a name="tili.omit"></a>

#### \_.omit(names, obj) ⇒ <code>Object</code>

Returns a partial copy of an object omitting the keys specified.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Object</code> - A new object with properties from `names` not on it.  
**Category**: Object  
**Sig**: [String] -> {String: _} -> {String: _}  
**See**: pick  
**Since**: v0.3.0

| Param | Type                | Description                                                   |
| ----- | ------------------- | ------------------------------------------------------------- |
| names | <code>Array</code>  | an array of String property names to omit from the new object |
| obj   | <code>Object</code> | The object to copy from                                       |

**Example**

```js
omit(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 }); //=> {b: 2, c: 3}
```

---

<a name="tili.path"></a>

#### \_.path(paths, obj) ⇒ <code>\*</code>

Retrieve the value at a given path.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>\*</code> - The data at `path`.  
**Category**: Object  
**Typedefn**: Idx = String | Int  
**Sig**: [Idx] -> {a} -> a | Undefined  
**Since**: v0.1.0

| Param | Type                | Description                                      |
| ----- | ------------------- | ------------------------------------------------ |
| paths | <code>Array</code>  | The path to use.                                 |
| obj   | <code>Object</code> | The object to retrieve the nested property from. |

**Example**

```js
path(['a', 'b'], { a: { b: 2 } }); //=> 2
path(['a', 'b'], { c: { b: 2 } }); //=> undefined
```

---

<a name="tili.pick"></a>

#### \_.pick(names, obj) ⇒ <code>Object</code>

Returns a partial copy of an object containing only the keys specified. If
the key does not exist, the property is ignored.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Object</code> - A new object with only properties from `names` on it.  
**Category**: Object  
**Sig**: [k] -> {k: v} -> {k: v}  
**See**: omit  
**Since**: v0.3.0

| Param | Type                | Description                                                 |
| ----- | ------------------- | ----------------------------------------------------------- |
| names | <code>Array</code>  | an array of String property names to copy onto a new object |
| obj   | <code>Object</code> | The object to copy from                                     |

**Example**

```js
pick(['a', 'd'], { a: 1, b: 2, c: 3, d: 4 }); //=> {a: 1, d: 4}
pick(['a', 'e', 'f'], { a: 1, b: 2, c: 3, d: 4 }); //=> {a: 1}
```

---

<a name="tili.values"></a>

#### \_.values(obj) ⇒ <code>Array</code>

Returns a list of all the enumerable own properties of the supplied object.
Note that the order of the output array is not guaranteed across different
JS platforms.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Array</code> - An array of the values of the object's own properties.  
**Category**: Object  
**Sig**: <code>k: v</code> -> [v]  
**Since**: v0.6.0

| Param | Type                | Description                       |
| ----- | ------------------- | --------------------------------- |
| obj   | <code>Object</code> | The object to extract values from |

**Example**

```js
values({ a: 1, b: 2, c: 3 }); //=> [1, 2, 3]
```

---

<a name="tili.clamp"></a>

#### \_.clamp(min, max, value) ⇒ <code>Number</code>

Restricts a number to be within a range.

Also works for other ordered types such as Strings and Dates.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>Number</code> - Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise  
**Category**: Relation  
**Sig**: Ord a => a -> a -> a -> a  
**Since**: v0.4.0

| Param | Type                | Description                              |
| ----- | ------------------- | ---------------------------------------- |
| min   | <code>Number</code> | The lower limit of the clamp (inclusive) |
| max   | <code>Number</code> | The upper limit of the clamp (inclusive) |
| value | <code>Number</code> | Value to be clamped                      |

**Example**

```js
clamp(1, 10, -5); // => 1
clamp(1, 10, 15); // => 10
clamp(1, 10, 4); // => 4
```

---

<a name="tili.escape"></a>

#### \_.escape([string]) ⇒ <code>string</code>

Converts the characters "&", "<", ">", '"', and "'" in `string` to their
corresponding HTML entities.

**Note:** No other characters are escaped. To escape additional
characters use a third-party library like [_he_](https://mths.be/he).

Though the ">" character is escaped for symmetry, characters like
">" and "/" don't need escaping in HTML and have no special meaning
unless they're part of a tag or unquoted attribute value. See
[Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
(under "semi-related fun fact") for more details.

When working with HTML you should always
[quote attribute values](http://wonko.com/post/html-escaping) to reduce
XSS vectors.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>string</code> - Returns the escaped string.  
**Category**: String  
**See**: escapeRegExp, unescape  
**Since**: 0.7.0

| Param    | Type                | Default                               | Description           |
| -------- | ------------------- | ------------------------------------- | --------------------- |
| [string] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | The string to escape. |

**Example**

```js
escape('fred, barney, & pebbles');
// => 'fred, barney, &amp; pebbles'
```

---

<a name="tili.unescape"></a>

#### \_.unescape([string]) ⇒ <code>string</code>

The inverse of `escape`this method converts the HTML entities
`&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to
their corresponding characters.

**Note:** No other HTML entities are unescaped. To unescape additional
HTML entities use a third-party library like [_he_](https://mths.be/he).

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>string</code> - Returns the unescaped string.  
**Category**: String  
**See**: escape, escapeRegExp  
**Since**: 0.7.0

| Param    | Type                | Default                               | Description             |
| -------- | ------------------- | ------------------------------------- | ----------------------- |
| [string] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | The string to unescape. |

**Example**

```js
unescape('fred, barney, &amp; pebbles');
// => 'fred, barney, & pebbles'
```

---

<a name="tili.castArray"></a>

#### \_.castArray ⇒ <code>Array</code>

If the provided `value` is an array returns a copy of it otherwise returns an array containing the original `value`.

**Kind**: static constant of [<code>tili</code>](#tili)  
**Returns**: <code>Array</code> - Returns the cast array.  
**Category**: Type  
**Since**: 0.12.0

| Param | Type            | Description           |
| ----- | --------------- | --------------------- |
| value | <code>\*</code> | The value to inspect. |

**Example**

```js
_.castArray(1);
// => [1]

_.castArray({ a: 1 });
// => [{ 'a': 1 }]

_.castArray('abc');
// => ['abc']

_.castArray(null);
// => [null]

_.castArray(undefined);
// => [undefined]

var array = [1, 2, 3];
console.log(_.castArray(array) === array);
// => false
```

---

<a name="tili.is"></a>

#### \_.is(Ctor, value) ⇒ <code>Boolean</code>

See if an object (`val`) is an instance of the supplied constructor. This
function will check up the inheritance chain, if any.

**Kind**: static method of [<code>tili</code>](#tili)  
**Category**: Type  
**Sig**: (_ -> {_}) -> a -> Boolean  
**Since**: v0.1.0

| Param | Type                | Description       |
| ----- | ------------------- | ----------------- |
| Ctor  | <code>Object</code> | A constructor     |
| value | <code>\*</code>     | The value to test |

**Example**

```js
is(Object, {}); //=> true
is(Number, 1); //=> true
is(Object, 1); //=> false
is(String, 's'); //=> true
is(String, new String('')); //=> true
is(Object, new String('')); //=> true
is(Object, 's'); //=> false
is(Number, {}); //=> false
```

---

<a name="tili.isPlainObject"></a>

#### \_.isPlainObject(obj) ⇒ <code>boolean</code>

Checks if `value` is a plain object, that is, an object created by the
`Object` constructor or one with a `[[Prototype]]` of `null`.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a plain object, else `false`.  
**Category**: Type  
**Since**: 0.1.0

| Param | Type            | Description         |
| ----- | --------------- | ------------------- |
| obj   | <code>\*</code> | The value to check. |

**Example**

```js
function Foo() {
  this.a = 1;
}

isPlainObject(new Foo());
// => false

isPlainObject([1, 2, 3]);
// => false

isPlainObject({ x: 0, y: 0 });
// => true

isPlainObject(Object.create(null));
// => true
```

---

<a name="tili.type"></a>

#### \_.type(val) ⇒ <code>String</code>

Gives a single-word string description of the (native) type of a value,
returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
attempt to distinguish user Object types any further, reporting them all as
'Object'.

**Kind**: static method of [<code>tili</code>](#tili)  
**Category**: Type  
**Sig**: (_ -> {_}) -> String  
**Since**: v0.3.0

| Param | Type            | Description       |
| ----- | --------------- | ----------------- |
| val   | <code>\*</code> | The value to test |

**Example**

```js
type({}); //=> "Object"
type(1); //=> "Number"
type(false); //=> "Boolean"
type('s'); //=> "String"
type(null); //=> "Null"
type([]); //=> "Array"
type(/[A-z]/); //=> "RegExp"
type(() => {}); //=> "Function"
type(undefined); //=> "Undefined"
```

---

<a name="tili.uniqueId"></a>

#### \_.uniqueId(prefix) ⇒ <code>string</code>

Generates a unique ID. If `prefix` is given, the ID is appended to it.

**Kind**: static method of [<code>tili</code>](#tili)  
**Returns**: <code>string</code> - Returns the unique ID.  
**Category**: Util  
**Since**: 0.1.0

| Param  | Type                | Description                      |
| ------ | ------------------- | -------------------------------- |
| prefix | <code>string</code> | The value to prefix the ID with. |

**Example**

```js
uniqueId('contact_');
// => 'contact_104'

uniqueId();
// => '105'
```

---

## Credits

Some code and most naming is borrowed from the following popular JS utility libraries but lots of code is rewritten to be as lightweight and modular as possible.

- [Ramda](https://github.com/ramda/ramda)
- [Lodash](https://github.com/lodash/lodash)
- [Underscore](https://github.com/jashkenas/underscore)
