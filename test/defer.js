import test from 'ava';
import delay from 'delay';
import * as _ from '../src';

test('defer', async (t) => {
  var deferred = false;
  _.defer((bool) => {
    deferred = bool;
  }, true);

  t.falsy(deferred);

  await delay(1);
  t.truthy(deferred, 'deferred the function');
});
