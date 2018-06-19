import test from 'ava';
import * as _ from '../src';

test('works with built-in types', t => {
  t.is(_.is(Array, []), true);
  t.is(_.is(Boolean, new Boolean(false)), true);
  t.is(_.is(Date, new Date()), true);
  t.is(_.is(Function, () => {}), true);
  t.is(_.is(Number, new Number(0)), true);
  t.is(_.is(Object, {}), true);
  t.is(_.is(RegExp, /(?:)/), true);
  t.is(_.is(String, new String('')), true);
});

test('works with user-defined types', t => {
  function Foo() {}
  function Bar() {}
  Bar.prototype = new Foo();

  var foo = new Foo();
  var bar = new Bar();

  t.is(_.is(Foo, foo), true);
  t.is(_.is(Bar, bar), true);
  t.is(_.is(Foo, bar), true);
  t.is(_.is(Bar, foo), false);
});

test('considers almost everything an object', t => {
  function Foo() {}
  var foo = new Foo();
  var isObject = _.curry(_.is)(Object);

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
  t.is(_.is(Boolean, 1), false);
  t.is(_.is(Number, '1'), false);
  t.is(_.is(Number, false), false);
});

test('recognizes primitives as their object equivalents', t => {
  t.is(_.is(Boolean, false), true);
  t.is(_.is(Number, 0), true);
  t.is(_.is(String, ''), true);
});

test('does not consider primitives to be instances of Object', t => {
  t.is(_.is(Object, false), false);
  t.is(_.is(Object, 0), false);
  t.is(_.is(Object, ''), false);
});
