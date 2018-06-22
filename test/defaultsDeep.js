import test from 'ava';
import * as l from '../src';

test('should mutate target and return same object', t => {
  const target = { a: { b: 2 } };
  const expected = { a: { b: 2, c: 3 } };

  const actual = l.defaultsDeep(target, { a: { b: 1, c: 3 } });

  t.truthy(actual === target);
  t.deepEqual(actual, expected);
});
