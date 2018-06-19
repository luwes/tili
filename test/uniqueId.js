import test from 'ava';
import * as _ from '../src';

test('uniqueId', function(t) {
  var ids = [], i = 0;
  while (i++ < 100) ids.push(_.uniqueId());
  t.is(Array.from(new Set(ids)).length, ids.length,
    'can generate a globally-unique stream of ids');
});
