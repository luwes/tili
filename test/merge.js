import test from 'ava';
import * as _ from '../src';

test('should mutate target and return same object', t => {
  const target = { a: 4 };
  const expected = { a: 4, b: 3 };

  const actual = _.merge(target, { b: 3 });

  t.truthy(actual === target);
  t.deepEqual(actual, expected);
});

test('should mutate target and return same array', t => {
  const target = [{ a: 4 }];
  const expected = [{ a: 4, b: 3 }];

  const actual = _.merge(target, [{ b: 3 }]);

  t.truthy(actual === target);
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

  t.deepEqual(_.merge(names, ages, heights), expected);
});

test('should work with four arguments', t => {
  const expected = { a: 4 };
  const actual = _.merge({ a: 1 }, { a: 2 }, { a: 3 }, expected);

  t.deepEqual(actual, expected);
});

test('should not overwrite existing values with `undefined` source values', t => {
  const actual = _.merge({ a: 1 }, { a: undefined, b: undefined });
  t.deepEqual(actual, { a: 1, b: undefined });
});

test('should merge onto function `object` values', t => {
  function Foo() {}

  var source = { a: 1 };
  var actual = _.merge(Foo, source);

  t.truthy(actual === Foo);
  t.is(Foo.a, 1);
});

test('should merge onto non-plain `object` values', t => {
  function Foo() {}

  var object = new Foo();
  var actual = _.merge(object, { a: 1 });

  t.truthy(actual === object);
  t.is(object.a, 1);
});
