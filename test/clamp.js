import test from 'ava';
import * as _ from '../src';

test('clamps to the lower bound', function(t) {
  t.is(_.clamp(1, 10, 0), 1);
  t.is(_.clamp(3, 12, 1), 3);
  t.is(_.clamp(-15, 3, -100), -15);
});

test('clamps to the upper bound', function(t) {
  t.is(_.clamp(1, 10, 20), 10);
  t.is(_.clamp(3, 12, 23), 12);
  t.is(_.clamp(-15, 3, 16), 3);
});

test('leaves it alone when within the bound', function(t) {
  t.is(_.clamp(1, 10, 4), 4);
  t.is(_.clamp(3, 12, 6), 6);
  t.is(_.clamp(-15, 3, 0), 0);
});

test('works with letters as well', function(t) {
  t.is(_.clamp('d', 'n', 'f'), 'f');
  t.is(_.clamp('d', 'n', 'a'), 'd');
  t.is(_.clamp('d', 'n', 'q'), 'n');
});
