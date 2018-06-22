import test from 'ava';
import delay from 'delay';
import * as l from '../src';

test('defer', async (t) => {
  var deferred = false;
  l.defer((bool) => {
    deferred = bool;
  }, true);

  t.falsy(deferred);

  await delay(1);
  t.truthy(deferred, 'deferred the function');
});
