import test from 'ava';
import * as l from '../src';

test('values', function(t) {
  t.deepEqual(l.values({one: 1, two: 2}), [1, 2], 'can extract the values from an object');
  t.deepEqual(l.values({one: 1, two: 2, length: 3}), [1, 2, 3], '... even when one of them is "length"');
});
