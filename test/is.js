import test from 'ava';
import * as l from '../src';

test('works with built-in types', t => {
  t.is(l.is(Array, []), true);
  t.is(l.is(Boolean, new Boolean(false)), true);
  t.is(l.is(Date, new Date()), true);
  t.is(l.is(Function, () => {}), true);
  t.is(l.is(Number, new Number(0)), true);
  t.is(l.is(Object, {}), true);
  t.is(l.is(RegExp, /(?:)/), true);
  t.is(l.is(String, new String('')), true);
});

test('works with user-defined types', t => {
  function Foo() {}
  function Bar() {}
  Bar.prototype = new Foo();

  var foo = new Foo();
  var bar = new Bar();

  t.is(l.is(Foo, foo), true);
  t.is(l.is(Bar, bar), true);
  t.is(l.is(Foo, bar), true);
  t.is(l.is(Bar, foo), false);
});

test('considers almost everything an object', t => {
  function Foo() {}
  var foo = new Foo();
  var isObject = l.curry(l.is)(Object);

  t.is(isObject(foo), true);
  t.is(isObject(((...args) => args)()), true);
  t.is(isObject([]), true);
  t.is(isObject(new Boolean(false)), true);
  t.is(isObject(new Date()), true);
  t.is(isObject(() => {}), true);
  t.is(isObject(new Number(0)), true);
  t.is(isObject(/(?:)/), true);
  t.is(isObject(new String('')), true);

  t.is(isObject(null), false);
  t.is(isObject(undefined), false);
});

test('does not coerce', t => {
  t.is(l.is(Boolean, 1), false);
  t.is(l.is(Number, '1'), false);
  t.is(l.is(Number, false), false);
});

test('recognizes primitives as their object equivalents', t => {
  t.is(l.is(Boolean, false), true);
  t.is(l.is(Number, 0), true);
  t.is(l.is(String, ''), true);
});

test('does not consider primitives to be instances of Object', t => {
  t.is(l.is(Object, false), false);
  t.is(l.is(Object, 0), false);
  t.is(l.is(Object, ''), false);
});
