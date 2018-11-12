import test from 'ava';
import * as l from '../src';

test('turns a nested list into one flat list', function(t) {
  var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
  t.deepEqual(l.flat(nest), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
  t.deepEqual(l.flat(nest), [3, 2, 1, 0, -1, -2, -3]);
  t.deepEqual(l.flat([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
});

test('is not destructive', function(t) {
  var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
  t.not(l.flat(nest), nest);
});

test('handles array-like objects', function(t) {
  var o = { length: 3, 0: [1, 2, [3]], 1: [], 2: ['a', 'b', 'c', ['d', 'e']] };
  t.deepEqual(l.flat(o), [1, 2, 3, 'a', 'b', 'c', 'd', 'e']);
});

test('flattens an array of empty arrays', function(t) {
  t.deepEqual(l.flat([[], [], []]), []);
  t.deepEqual(l.flat([]), []);
});

test('flattens one level deep', function(t) {
  var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
  t.deepEqual(l.flat(1, nest), [1, 2, 3, [4, 5], 6, [[[7], 8]], 9, 10]);
});

test('flattens two levels deep', function(t) {
  var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
  const flat2 = l.curry(l.flat)(2);
  t.deepEqual(flat2(nest), [1, 2, 3, 4, 5, 6, [[7], 8], 9, 10]);
});
