import test from 'ava';
import * as l from '../src';

test('clamps to the lower bound', function(t) {
  t.is(l.clamp(1, 10, 0), 1);
  t.is(l.clamp(3, 12, 1), 3);
  t.is(l.clamp(-15, 3, -100), -15);
});

test('clamps to the upper bound', function(t) {
  t.is(l.clamp(1, 10, 20), 10);
  t.is(l.clamp(3, 12, 23), 12);
  t.is(l.clamp(-15, 3, 16), 3);
});

test('leaves it alone when within the bound', function(t) {
  t.is(l.clamp(1, 10, 4), 4);
  t.is(l.clamp(3, 12, 6), 6);
  t.is(l.clamp(-15, 3, 0), 0);
});

test('works with letters as well', function(t) {
  t.is(l.clamp('d', 'n', 'f'), 'f');
  t.is(l.clamp('d', 'n', 'a'), 'd');
  t.is(l.clamp('d', 'n', 'q'), 'n');
});

test('throws if min is bigger than max', function(t) {
  t.throws(() => l.clamp(11, 10, 4));
});
