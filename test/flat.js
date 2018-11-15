import test from 'ava';
import * as l from '../src';

test('flattens one level deep', function(t) {
  var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
  t.deepEqual(l.flat(1, nest), [1, 2, 3, [4, 5], 6, [[[7], 8]], 9, 10]);
});

test('flattens two levels deep', function(t) {
  var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
  const flat2 = l.flat(2);
  t.deepEqual(flat2(nest), [1, 2, 3, 4, 5, 6, [[7], 8], 9, 10]);
});
