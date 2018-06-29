import test from 'ava';
import * as l from '../src';

test('should mutate target and return same object', t => {
  const target = { a: 4, d: [1] };
  const expected = { a: 4, b: 3, c: [99], d: [2], e: { x: [] } };

  const actual = l.merge(target, { b: 3, c: [99], d: [2], e: { x: [] } });

  t.true(actual === target);
  t.deepEqual(actual, expected);
});

test('replace simple key with nested object in target', function(t) {
  var target = { a: 1, b: 1 };
  var expected = { a: { x: 8, y: 9 }, b: 1 };

  const actual = l.merge(target, { a: { x: 8, y: 9 } });

  t.true(actual === target);
  t.deepEqual(actual, expected);
});

test('replace simple key with nested array in target', function(t) {
  var target = { a: 1, b: 1 };
  var expected = { a: [8, 9], b: 1 };

  const actual = l.merge(target, { a: [8, 9] });

  t.true(actual === target);
  t.deepEqual(actual, expected);
});

test('should mutate target and return same array', t => {
  const target = [{ a: 4 }];
  const expected = [{ a: 4, b: 3 }];

  const actual = l.merge(target, [{ b: 3 }]);

  t.true(actual === target);
  t.deepEqual(actual, expected);
});

test('merges an object', t => {
  const names = {
    characters: [{ name: 'barney' }, { name: 'fred' }]
  };

  const ages = {
    characters: [{ age: 36 }, { age: 40 }]
  };

  const heights = {
    characters: [{ height: '5\'4"' }, { height: '5\'5"' }]
  };

  const expected = {
    characters: [
      { name: 'barney', age: 36, height: '5\'4"' },
      { name: 'fred', age: 40, height: '5\'5"' }
    ]
  };

  t.deepEqual(l.merge(names, ages, heights), expected);
});

test('should work with four arguments', t => {
  const expected = { a: 4 };
  const actual = l.merge({ a: 1 }, { a: 2 }, { a: 3 }, expected);

  t.deepEqual(actual, expected);
});

test('should not overwrite existing values with `undefined` source values', t => {
  const actual = l.merge({ a: 1 }, { a: undefined, b: undefined });
  t.deepEqual(actual, { a: 1, b: undefined });
});

test('should merge onto function `object` values', t => {
  function Foo() {}

  var source = { a: 1 };
  var actual = l.merge(Foo, source);

  t.true(actual === Foo);
  t.is(Foo.a, 1);
});

test('should merge onto non-plain `object` values', t => {
  function Foo() {}

  var object = new Foo();
  var actual = l.merge(object, { a: 1 });

  t.true(actual === object);
  t.is(object.a, 1);
});
