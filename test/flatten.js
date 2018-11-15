import test from 'ava';
import * as l from '../src';

test('turns a nested list into one flat list', function(t) {
  var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
  t.deepEqual(l.flatten(nest), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  nest = [[[[3]], 2, 1], 0, [[-1, -2], -3]];
  t.deepEqual(l.flatten(nest), [3, 2, 1, 0, -1, -2, -3]);
  t.deepEqual(l.flatten([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
});

test('is not destructive', function(t) {
  var nest = [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10];
  t.not(l.flatten(nest), nest);
});

test('flattens an array of empty arrays', function(t) {
  t.deepEqual(l.flatten([[], [], []]), []);
  t.deepEqual(l.flatten([]), []);
});
