import test from 'ava';
import * as l from '../src';

test('round like advertised', function(t) {
  t.is(l.round(4.006), 4);
  t.is(l.round(4.006, 2), 4.01);
  t.is(l.round(4060, -2), 4100);
});
