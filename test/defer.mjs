/* eslint-env node */
/* eslint no-global-assign:0 */
import test from 'ava';
import delay from 'delay';
import { defer } from '../src';

test('defer should throw on non function', (t) => {
  t.throws(() => defer({}, true));
});

test.serial('defer with process.nextTick', async (t) => {
  var deferred = false;

  defer((bool) => {
    deferred = bool;
  }, true);

  t.false(deferred);

  await delay(1);
  t.true(deferred, 'deferred the function');
});

test.serial('defer with Promise', async (t) => {
  var deferred = false;

  const nextTick = process.nextTick;
  process.nextTick = null;

  defer((bool) => {
    deferred = bool;
  }, true);

  process.nextTick = nextTick;

  t.false(deferred);

  await delay(1);
  t.true(deferred, 'deferred the function');
});

test.serial('defer with setImmediate', async (t) => {
  var deferred = false;

  const nextTick = process.nextTick;
  process.nextTick = null;
  const tempPromise = Promise;
  Promise = null;

  defer((bool) => {
    deferred = bool;
  }, true);

  process.nextTick = nextTick;
  Promise = tempPromise;

  t.false(deferred);

  await delay(1);
  t.true(deferred, 'deferred the function');
});

test.serial('defer with setTimeout', async (t) => {
  var deferred = false;

  const nextTick = process.nextTick;
  process.nextTick = null;
  const tempPromise = Promise;
  Promise = null;
  const tempSetImmediate = setImmediate;
  setImmediate = null;

  defer((bool) => {
    deferred = bool;
  }, true);

  process.nextTick = nextTick;
  Promise = tempPromise;
  setImmediate = tempSetImmediate;

  t.false(deferred);

  await delay(1);
  t.true(deferred, 'deferred the function');
});
