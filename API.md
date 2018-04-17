## Functions

<dl>
<dt><a href="#compose">compose(...funcs)</a> ⇒ <code>function</code></dt>
<dd><p>Composes single-argument functions from right to left. The rightmost
function can take multiple arguments as it provides the signature for
the resulting composite function.</p>
</dd>
<dt><a href="#curryN">curryN(length, fn, ...args)</a> ⇒ <code>function</code></dt>
<dd><p>Curry a function by argument length.</p>
</dd>
<dt><a href="#curry">curry(fn, ...args)</a> ⇒ <code>function</code></dt>
<dd><p>Curry a function.</p>
</dd>
<dt><a href="#delay">delay(wait, func, [...args])</a> ⇒ <code>number</code></dt>
<dd><p>Invokes <code>func</code> after <code>wait</code> milliseconds. Any additional arguments are
provided to <code>func</code> when it&#39;s invoked.</p>
</dd>
<dt><a href="#debounce">debounce(wait, func, immediate)</a> ⇒ <code>function</code></dt>
<dd><p>Returns a function, that, as long as it continues to be invoked, will not
be triggered. The function will be called after it stops being called for
N milliseconds. If <code>immediate</code> is passed, trigger the function on the
leading edge, instead of the trailing.</p>
</dd>
<dt><a href="#defer">defer(func)</a> ⇒ <code>Promise</code></dt>
<dd><p>Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to func when it&#39;s invoked.</p>
</dd>
<dt><a href="#memoize">memoize(fn)</a> ⇒ <code>*</code></dt>
<dd><p>Memoize a function.</p>
</dd>
<dt><a href="#tap">tap(fn, x)</a> ⇒ <code>*</code></dt>
<dd><p>Runs the given function with the supplied object, then returns the object.</p>
</dd>
<dt><a href="#throttle">throttle(wait, fn, options)</a> ⇒ <code>function</code></dt>
<dd><p>Throttle a function.</p>
</dd>
<dt><a href="#includes">includes(search, arr)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if string or array includes the searched part.</p>
</dd>
<dt><a href="#defaultTo">defaultTo(d, v)</a> ⇒ <code>*</code></dt>
<dd><p>Default to a value if the passed is null or undefined.</p>
</dd>
<dt><a href="#isEmpty">isEmpty(val)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns <code>true</code> if the given value is its type&#39;s empty value; <code>false</code>
otherwise.</p>
</dd>
<dt><a href="#round">round(number, [precision])</a> ⇒ <code>number</code></dt>
<dd><p>Computes <code>number</code> rounded to <code>precision</code>.</p>
</dd>
<dt><a href="#clone">clone(value)</a> ⇒ <code>*</code></dt>
<dd><p>Creates a deep copy of the value which may contain (nested) <code>Array</code>s and
<code>Object</code>s, <code>Number</code>s, <code>String</code>s, <code>Boolean</code>s and <code>Date</code>s. <code>Function</code>s are
assigned by reference rather than copied</p>
<p>Dispatches to a <code>clone</code> method if present.</p>
</dd>
<dt><a href="#merge">merge(target, [...sources])</a> ⇒ <code>Object</code></dt>
<dd><p>This method is like <code>assign</code> except that it recursively merges own and
inherited enumerable string keyed properties of source objects into the
destination object. Source properties that resolve to <code>undefined</code> are
skipped if a destination value exists. Array and plain object properties
are merged recursively. Other objects and value types are overridden by
assignment. Source objects are applied from left to right. Subsequent
sources overwrite property assignments of previous sources.</p>
<p><strong>Note:</strong> This method mutates <code>target</code>.</p>
</dd>
<dt><a href="#omit">omit(names, obj)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a partial copy of an object omitting the keys specified.</p>
</dd>
<dt><a href="#path">path(paths, obj)</a> ⇒ <code>*</code></dt>
<dd><p>Retrieve the value at a given path.</p>
</dd>
<dt><a href="#pick">pick(names, obj)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a partial copy of an object containing only the keys specified. If
the key does not exist, the property is ignored.</p>
</dd>
<dt><a href="#clamp">clamp(min, max, value)</a> ⇒ <code>Number</code></dt>
<dd><p>Restricts a number to be within a range.</p>
<p>Also works for other ordered types such as Strings and Dates.</p>
</dd>
<dt><a href="#type">type(val)</a> ⇒ <code>String</code></dt>
<dd><p>Gives a single-word string description of the (native) type of a value,
returning such answers as &#39;Object&#39;, &#39;Number&#39;, &#39;Array&#39;, or &#39;Null&#39;. Does not
attempt to distinguish user Object types any further, reporting them all as
&#39;Object&#39;.</p>
</dd>
<dt><a href="#is">is(Ctor, val)</a> ⇒ <code>Boolean</code></dt>
<dd><p>See if an object (<code>val</code>) is an instance of the supplied constructor. This
function will check up the inheritance chain, if any.</p>
</dd>
<dt><a href="#isPlainObject">isPlainObject(obj)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if <code>value</code> is a plain object, that is, an object created by the
<code>Object</code> constructor or one with a <code>[[Prototype]]</code> of <code>null</code>.</p>
</dd>
<dt><a href="#uniqueId">uniqueId([prefix])</a> ⇒ <code>string</code></dt>
<dd><p>Generates a unique ID. If <code>prefix</code> is given, the ID is appended to it.</p>
</dd>
</dl>

<a name="compose"></a>

## compose(...funcs) ⇒ <code>function</code>
Composes single-argument functions from right to left. The rightmost
function can take multiple arguments as it provides the signature for
the resulting composite function.

**Kind**: global function  
**Returns**: <code>function</code> - - A function obtained by composing the argument functions
from right to left. For example, compose(f, g, h) is identical to doing
(...args) => f(g(h(...args))).  
**Category**: Function  
**Since**: v0.1.0  

| Param | Type | Description |
| --- | --- | --- |
| ...funcs | <code>function</code> | The functions to compose. |

<a name="curryN"></a>

## curryN(length, fn, ...args) ⇒ <code>function</code>
Curry a function by argument length.

**Kind**: global function  
**Category**: Function  
**Since**: v0.1.0  

| Param | Type |
| --- | --- |
| length | <code>Number</code> | 
| fn | <code>function</code> | 
| ...args | <code>function</code> | 

<a name="curry"></a>

## curry(fn, ...args) ⇒ <code>function</code>
Curry a function.

**Kind**: global function  
**Category**: Function  
**Since**: v0.1.0  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 
| ...args | <code>function</code> | 

<a name="delay"></a>

## delay(wait, func, [...args]) ⇒ <code>number</code>
Invokes `func` after `wait` milliseconds. Any additional arguments are
provided to `func` when it's invoked.

**Kind**: global function  
**Returns**: <code>number</code> - Returns the timer id.  
**Category**: Function  
**Since**: 0.4.0  

| Param | Type | Description |
| --- | --- | --- |
| wait | <code>number</code> | The number of milliseconds to delay invocation. |
| func | <code>function</code> | The function to delay. |
| [...args] | <code>\*</code> | The arguments to invoke `func` with. |

**Example**  
```js
delay(text => console.log(text), 1000, 'later')
// => Logs 'later' after one second.
```
<a name="debounce"></a>

## debounce(wait, func, immediate) ⇒ <code>function</code>
Returns a function, that, as long as it continues to be invoked, will not
be triggered. The function will be called after it stops being called for
N milliseconds. If `immediate` is passed, trigger the function on the
leading edge, instead of the trailing.

**Kind**: global function  
**Category**: Function  
**Since**: v0.4.0  

| Param | Type | Description |
| --- | --- | --- |
| wait | <code>Number</code> | Amount of milliseconds |
| func | <code>function</code> |  |
| immediate | <code>Boolean</code> |  |

<a name="defer"></a>

## defer(func) ⇒ <code>Promise</code>
Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to func when it's invoked.

**Kind**: global function  
**Returns**: <code>Promise</code> - defer promise  
**Category**: Function  
**See**: https://github.com/jamiebuilds/tickedoff  
**Since**: v0.4.0  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | deferred function |

<a name="memoize"></a>

## memoize(fn) ⇒ <code>\*</code>
Memoize a function.

**Kind**: global function  
**Category**: Function  
**Since**: v0.1.0  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="tap"></a>

## tap(fn, x) ⇒ <code>\*</code>
Runs the given function with the supplied object, then returns the object.

**Kind**: global function  
**Returns**: <code>\*</code> - `x`.  
**Category**: Function  
**Sig**: (a -> *) -> a -> a  
**Symb**: tap(f, a) = a  
**Since**: v0.3.0  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to call with `x`. The return value of `fn` will be thrown away. |
| x | <code>\*</code> |  |

**Example**  
```js
const sayX = x => console.log('x is ' + x);
   tap(sayX, 100); //=> 100
   // logs 'x is 100'
```
<a name="throttle"></a>

## throttle(wait, fn, options) ⇒ <code>function</code>
Throttle a function.

**Kind**: global function  
**Category**: Function  
**Since**: v0.2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| wait | <code>Number</code> |  |  |
| fn | <code>function</code> |  |  |
| options | <code>Object</code> |  |  |
| [options.leading] | <code>Boolean</code> | <code>true</code> | Trigger a leading function call. |
| [options.trailing] | <code>Boolean</code> | <code>true</code> | Trigger a trailing function call. |

<a name="includes"></a>

## includes(search, arr) ⇒ <code>Boolean</code>
Check if string or array includes the searched part.

**Kind**: global function  
**Category**: List  
**Since**: v0.1.0  

| Param | Type |
| --- | --- |
| search | <code>\*</code> | 
| arr | <code>Array</code> \| <code>String</code> | 

<a name="defaultTo"></a>

## defaultTo(d, v) ⇒ <code>\*</code>
Default to a value if the passed is null or undefined.

**Kind**: global function  
**Category**: Logic  
**Since**: v0.1.0  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>\*</code> | The default value. |
| v | <code>\*</code> | The passed value. |

<a name="isEmpty"></a>

## isEmpty(val) ⇒ <code>Boolean</code>
Returns `true` if the given value is its type's empty value; `false`
otherwise.

**Kind**: global function  
**Category**: Logic  
**Sig**: a -> Boolean  
**Since**: v0.4.0  

| Param | Type |
| --- | --- |
| val | <code>\*</code> | 

**Example**  
```js
isEmpty([1, 2, 3]);   //=> false
     isEmpty([]);          //=> true
     isEmpty('');          //=> true
     isEmpty(null);        //=> true
     isEmpty({});          //=> true
     isEmpty({length: 0}); //=> false
```
<a name="round"></a>

## round(number, [precision]) ⇒ <code>number</code>
Computes `number` rounded to `precision`.

**Kind**: global function  
**Returns**: <code>number</code> - Returns the rounded number.  
**Category**: Math  
**Since**: 0.4.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| number | <code>number</code> |  | The number to round. |
| [precision] | <code>number</code> | <code>0</code> | The precision to round to. |

**Example**  
```js
round(4.006)
// => 4

round(4.006, 2)
// => 4.01

round(4060, -2)
// => 4100
```
<a name="clone"></a>

## clone(value) ⇒ <code>\*</code>
Creates a deep copy of the value which may contain (nested) `Array`s and
`Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
assigned by reference rather than copied

Dispatches to a `clone` method if present.

**Kind**: global function  
**Returns**: <code>\*</code> - A deeply cloned copy of `val`  
**Category**: Object  
**Sig**: <code>\*</code> -> {*}  
**Since**: v0.3.0  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The object or array to clone |

**Example**  
```js
const objects = [{}, {}, {}];
   const objectsClone = clone(objects);
   objects === objectsClone; //=> false
   objects[0] === objectsClone[0]; //=> false
```
<a name="merge"></a>

## merge(target, [...sources]) ⇒ <code>Object</code>
This method is like `assign` except that it recursively merges own and
inherited enumerable string keyed properties of source objects into the
destination object. Source properties that resolve to `undefined` are
skipped if a destination value exists. Array and plain object properties
are merged recursively. Other objects and value types are overridden by
assignment. Source objects are applied from left to right. Subsequent
sources overwrite property assignments of previous sources.

**Note:** This method mutates `target`.

**Kind**: global function  
**Returns**: <code>Object</code> - Returns `object`.  
**Category**: Object  
**Since**: 0.4.0  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> | The destination object. |
| [...sources] | <code>Object</code> | The source objects. |

**Example**  
```js
const object = {
     'a': [{ 'b': 2 }, { 'd': 4 }]
   }

   const other = {
     'a': [{ 'c': 3 }, { 'e': 5 }]
   }

   merge(object, other)
   // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
```
<a name="omit"></a>

## omit(names, obj) ⇒ <code>Object</code>
Returns a partial copy of an object omitting the keys specified.

**Kind**: global function  
**Returns**: <code>Object</code> - A new object with properties from `names` not on it.  
**Category**: Object  
**Sig**: [String] -> {String: *} -> {String: *}  
**See**: pick  
**Since**: v0.3.0  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array</code> | an array of String property names to omit from the new object |
| obj | <code>Object</code> | The object to copy from |

**Example**  
```js
omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
```
<a name="path"></a>

## path(paths, obj) ⇒ <code>\*</code>
Retrieve the value at a given path.

**Kind**: global function  
**Returns**: <code>\*</code> - The data at `path`.  
**Category**: Object  
**Typedefn**: Idx = String | Int  
**Sig**: [Idx] -> {a} -> a | Undefined  
**Since**: v0.1.0  

| Param | Type | Description |
| --- | --- | --- |
| paths | <code>Array</code> | The path to use. |
| obj | <code>Object</code> | The object to retrieve the nested property from. |

**Example**  
```js
path(['a', 'b'], {a: {b: 2}}); //=> 2
   path(['a', 'b'], {c: {b: 2}}); //=> undefined
```
<a name="pick"></a>

## pick(names, obj) ⇒ <code>Object</code>
Returns a partial copy of an object containing only the keys specified. If
the key does not exist, the property is ignored.

**Kind**: global function  
**Returns**: <code>Object</code> - A new object with only properties from `names` on it.  
**Category**: Object  
**Sig**: [k] -> {k: v} -> {k: v}  
**See**: omit  
**Since**: v0.3.0  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array</code> | an array of String property names to copy onto a new object |
| obj | <code>Object</code> | The object to copy from |

**Example**  
```js
pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
   pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
```
<a name="clamp"></a>

## clamp(min, max, value) ⇒ <code>Number</code>
Restricts a number to be within a range.

Also works for other ordered types such as Strings and Dates.

**Kind**: global function  
**Returns**: <code>Number</code> - Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise  
**Category**: Relation  
**Sig**: Ord a => a -> a -> a -> a  
**Since**: v0.4.0  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>Number</code> | The lower limit of the clamp (inclusive) |
| max | <code>Number</code> | The upper limit of the clamp (inclusive) |
| value | <code>Number</code> | Value to be clamped |

**Example**  
```js
clamp(1, 10, -5) // => 1
     clamp(1, 10, 15) // => 10
     clamp(1, 10, 4)  // => 4
```
<a name="type"></a>

## type(val) ⇒ <code>String</code>
Gives a single-word string description of the (native) type of a value,
returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
attempt to distinguish user Object types any further, reporting them all as
'Object'.

**Kind**: global function  
**Category**: Type  
**Sig**: (* -> {*}) -> String  
**Since**: v0.3.0  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | The value to test |

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
<a name="is"></a>

## is(Ctor, val) ⇒ <code>Boolean</code>
See if an object (`val`) is an instance of the supplied constructor. This
function will check up the inheritance chain, if any.

**Kind**: global function  
**Category**: Type  
**Sig**: (* -> {*}) -> a -> Boolean  
**Since**: v0.1.0  

| Param | Type | Description |
| --- | --- | --- |
| Ctor | <code>Object</code> | A constructor |
| val | <code>\*</code> | The value to test |

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
<a name="isPlainObject"></a>

## isPlainObject(obj) ⇒ <code>boolean</code>
Checks if `value` is a plain object, that is, an object created by the
`Object` constructor or one with a `[[Prototype]]` of `null`.

**Kind**: global function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a plain object, else `false`.  
**Category**: Type  
**Since**: 0.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | The value to check. |

**Example**  
```js
function Foo() {
     this.a = 1
   }

   isPlainObject(new Foo)
   // => false

   isPlainObject([1, 2, 3])
   // => false

   isPlainObject({ 'x': 0, 'y': 0 })
   // => true

   isPlainObject(Object.create(null))
   // => true
```
<a name="uniqueId"></a>

## uniqueId([prefix]) ⇒ <code>string</code>
Generates a unique ID. If `prefix` is given, the ID is appended to it.

**Kind**: global function  
**Returns**: <code>string</code> - Returns the unique ID.  
**Category**: Util  
**Since**: 0.1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [prefix] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | The value to prefix the ID with. |

**Example**  
```js
uniqueId('contact_');
   // => 'contact_104'

   uniqueId();
   // => '105'
```
