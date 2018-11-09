import test from 'ava';
import * as l from '../src';

test('path', function(t) {
  t.is(l.path(['a', 'b'], {a: {b: 2}}), 2);
  t.is(l.path(['a', 'b'], {c: {b: 2}}), undefined);
});
