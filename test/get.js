import test from 'ava';
import * as _ from '../src';

test('get', function(t) {
  t.is(_.get('a.b', {a: {b: 2}}), 2);
  t.is(_.get('a.b', {c: {b: 2}}), undefined);
});
