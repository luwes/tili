import test from 'ava';
import * as l from '../src';

test('without', function(t) {
  t.deepEqual(l.without([1, 2], [1, 2, 1, 3, 4]), [3, 4]);
});
