import test from 'ava';
import * as l from '../src';

test('should wrap non-array items in an array', function(t) {
  t.plan(1);

  var falsey = [, null, undefined, false, 0, NaN, ''];
  var values = falsey.concat(true, 1, 'a', { a: 1 });
  var expected = values.map(value => [value]);
  var actual = values.map(l.castArray);

  t.deepEqual(actual, expected);
});

test('should return array values by reference', function(t) {
  t.plan(1);

  var array = [1];
  t.is(l.castArray(array), array);
});

test('should return an empty array when no arguments are given', function(t) {
  t.plan(1);

  t.deepEqual(l.castArray(), []);
});
