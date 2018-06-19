import test from 'ava';
import * as _ from '../src';

test('path', function(t) {
  t.is(_.path(['a', 'b'], {a: {b: 2}}), 2);
  t.is(_.path(['a', 'b'], {c: {b: 2}}), undefined);
});
