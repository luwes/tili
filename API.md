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
<dt><a href="#defaultTo">defaultTo(d, v)</a> ⇒ <code>*</code></dt>
<dd><p>Default to a value if the passed is null or undefined.</p>
</dd>
<dt><a href="#includes">includes(search, arr)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if string or array includes the searched part.</p>
</dd>
<dt><a href="#is">is(Ctor, val)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Check if a value is of a certain type.</p>
</dd>
<dt><a href="#isPlainObject">isPlainObject(obj)</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
<dt><a href="#memoize">memoize(fn)</a> ⇒ <code>*</code></dt>
<dd><p>Memoize a function.</p>
</dd>
<dt><a href="#path">path(paths, obj)</a> ⇒ <code>*</code></dt>
<dd><p>Get an object value by array paths.</p>
</dd>
<dt><a href="#throttle">throttle(fn, wait, options)</a> ⇒ <code>function</code></dt>
<dd><p>Throttle a function.</p>
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

| Param | Type | Description |
| --- | --- | --- |
| ...funcs | <code>function</code> | The functions to compose. |

<a name="curryN"></a>

## curryN(length, fn, ...args) ⇒ <code>function</code>
Curry a function by argument length.

**Kind**: global function  

| Param | Type |
| --- | --- |
| length | <code>Number</code> | 
| fn | <code>function</code> | 
| ...args | <code>function</code> | 

<a name="curry"></a>

## curry(fn, ...args) ⇒ <code>function</code>
Curry a function.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 
| ...args | <code>function</code> | 

<a name="defaultTo"></a>

## defaultTo(d, v) ⇒ <code>\*</code>
Default to a value if the passed is null or undefined.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>\*</code> | The default value. |
| v | <code>\*</code> | The passed value. |

<a name="includes"></a>

## includes(search, arr) ⇒ <code>Boolean</code>
Check if string or array includes the searched part.

**Kind**: global function  

| Param | Type |
| --- | --- |
| search | <code>\*</code> | 
| arr | <code>Array</code> \| <code>String</code> | 

<a name="is"></a>

## is(Ctor, val) ⇒ <code>Boolean</code>
Check if a value is of a certain type.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| Ctor | <code>\*</code> | Constructor, can be built in types or user-defined. |
| val | <code>\*</code> |  |

<a name="isPlainObject"></a>

## isPlainObject(obj) ⇒ <code>Boolean</code>
**Kind**: global function  
**Returns**: <code>Boolean</code> - - True if the argument appears to be a plain object.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | The object to inspect. |

<a name="memoize"></a>

## memoize(fn) ⇒ <code>\*</code>
Memoize a function.

**Kind**: global function  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="path"></a>

## path(paths, obj) ⇒ <code>\*</code>
Get an object value by array paths.

**Kind**: global function  

| Param | Type |
| --- | --- |
| paths | <code>Array.&lt;string&gt;</code> | 
| obj | <code>object</code> | 

<a name="throttle"></a>

## throttle(fn, wait, options) ⇒ <code>function</code>
Throttle a function.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>function</code> |  |  |
| wait | <code>Number</code> |  |  |
| options | <code>Object</code> |  |  |
| [options.leading] | <code>Boolean</code> | <code>true</code> | Trigger a leading function call. |
| [options.trailing] | <code>Boolean</code> | <code>true</code> | Trigger a trailing function call. |

