import test from 'ava';
import * as _ from '../src';

test('includes', function(t) {
  t.truthy(_.includes(2, [1, 2, 3]), 'two is in the array');
  t.falsy(_.includes(2, [1, 3, 9]), 'two is not in the array');
});
