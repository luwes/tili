import test from 'ava';
import * as l from '../src';

test('includes', function(t) {
  t.truthy(l.includes(2, [1, 2, 3]), 'two is in the array');
  t.falsy(l.includes(2, [1, 3, 9]), 'two is not in the array');
});
