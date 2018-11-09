import test from 'ava';
import * as l from '../src';

test('get', function(t) {
  t.is(l.get('a.b', {a: {b: 2}}), 2);
  t.is(l.get('a.b', {c: {b: 2}}), undefined);
  t.is(l.get(['a', 'b'], {a: {b: 2}}), 2);
  t.is(l.get(['a', 'b'], {c: {b: 2}}), undefined);
});
