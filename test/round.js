import test from 'ava';
import * as l from '../src';

test('round like advertised', function(t) {
  t.is(l.round(0, 4.006), 4);
  t.is(l.round(2, 4.006), 4.01);
  t.is(l.round(-2, 4060), 4100);
});
