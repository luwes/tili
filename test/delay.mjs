import test from 'ava';
import testDelay from 'delay';
import * as l from '../src';

test('delay should throw on non function', (t) => {
  t.throws(() => l.delay(200, {}));
});

test.serial('delay', async (t) => {
  var deferred = false;

  l.delay(200, (bool) => {
    deferred = bool;
  }, true);

  t.false(deferred);

  await testDelay(200);
  t.true(deferred, 'deferred the function');
});
