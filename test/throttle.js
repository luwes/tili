import test from 'ava';
import delay from 'delay';
import * as l from '..';

test('throttle', async t => {
  let counter = 0;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 32);
  throttledIncr();
  throttledIncr();

  t.is(counter, 1, 'incr was called immediately');
  await delay(64);

  t.is(counter, 2, 'incr was throttled');
});

test('throttle arguments', async t => {
  let value = 0;
  const update = (val) => value = val;
  const throttledUpdate = l.throttle(update, 32);
  throttledUpdate(1);
  throttledUpdate(2);
  t.is(value, 1, 'updated to latest value');
  await delay(64);

  throttledUpdate(3);
  await delay(32);

  t.is(value, 3, 'updated to latest value');
});

test('throttle once', async t => {
  let counter = 0;
  const incr = () => ++counter;
  const throttledIncr = l.throttle(incr, 32);
  const result = throttledIncr();
  await delay(64);

  t.is(result, 1, 'throttled functions return their value');
  t.is(counter, 1, 'incr was called once');
});

test('throttle twice', async t => {
  let counter = 0;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 32);
  throttledIncr();
  throttledIncr();
  await delay(64);

  t.is(counter, 2, 'incr was called twice');
});

test.serial('more throttling', async t => {
  let counter = 0;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 30);

  throttledIncr();
  throttledIncr();
  t.is(counter, 1);
  await delay(85);

  t.is(counter, 2);
  throttledIncr();
  t.is(counter, 3);
});

test.serial('throttle repeatedly with results', async t => {
  let counter = 0;
  const incr = () => ++counter;
  const throttledIncr = l.throttle(incr, 100);

  const results = [];
  const saveResult = function() { results.push(throttledIncr()); };
  saveResult();
  saveResult();
  await delay(50);

  saveResult();
  await delay(100);

  saveResult();
  await delay(10);

  saveResult();
  await delay(70);

  saveResult();
  await delay(70);

  t.is(results[0], 1, 'incr was called once');
  t.is(results[1], 1, 'incr was throttled');
  t.is(results[2], 1, 'incr was throttled');
  t.is(results[3], 2, 'incr was called twice');
  t.is(results[4], 2, 'incr was throttled');
  t.is(results[5], 3, 'incr was called trailing');
});

test('throttle triggers trailing call when invoked repeatedly', async t => {
  let counter = 0;
  const limit = 48;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 32);

  const stamp = Date.now();
  while (Date.now() - stamp < limit) {
    throttledIncr();
  }
  const lastCount = counter;
  t.true(counter > 1);
  await delay(96);

  t.true(counter > lastCount);
});

test('throttle does not trigger leading call when leading is set to false', async t => {
  let counter = 0;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 60, { leading: false });

  throttledIncr();
  throttledIncr();
  t.is(counter, 0);
  await delay(96);

  t.is(counter, 1);
});

test.serial('more throttle does not trigger leading call when leading is set to false', async t => {
  let counter = 0;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 100, { leading: false });

  throttledIncr();
  t.is(counter, 0);
  await delay(50);

  throttledIncr();
  await delay(10);

  throttledIncr();
  await delay(140);

  throttledIncr();
  await delay(50);

  t.is(counter, 1);
  await delay(100);

  t.is(counter, 2);
});

test('one more throttle with leading: false test', async t => {
  let counter = 0;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 100, { leading: false });
  const time = new Date;
  while (new Date - time < 350) throttledIncr();
  t.true(counter <= 3);
  await delay(200);

  t.true(counter <= 4);
});

test('throttle does not trigger trailing call when trailing is set to false', async t => {
  let counter = 0;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 60, { trailing: false });

  throttledIncr();
  throttledIncr();
  throttledIncr();
  t.is(counter, 1);
  await delay(96);

  t.is(counter, 1);
  throttledIncr();
  throttledIncr();
  t.is(counter, 2);
  await delay(96);

  t.is(counter, 2);
});

test('throttle continues to function after system time is set backwards', async t => {
  let counter = 0;
  var incr = function(){ counter++; };
  var throttledIncr = l.throttle(incr, 100);
  var origNowFunc = l.now;

  throttledIncr();
  t.is(counter, 1);
  l.now = function() {
    return new Date(2013, 0, 1, 1, 1, 1);
  };

  setTimeout(function() {
    throttledIncr();
    t.is(counter, 2);

    l.now = origNowFunc;
  }, 200);
});

test('throttle re-entrant', async t => {
  const sequence = [
    ['b1', 'b2'],
    ['c1', 'c2']
  ];
  let value = '';
  let throttledAppend;
  const append = function(arg){
    value += this + arg;
    const args = sequence.pop();
    if (args) {
      throttledAppend.call(args[0], args[1]);
    }
  };
  throttledAppend = l.throttle(append, 32);
  throttledAppend.call('a1', 'a2');
  t.is(value, 'a1a2');
  await delay(100);

  t.is(value, 'a1a2c1c2b1b2', 'append was throttled successfully');
});

test('throttle cancel', async t => {
  let counter = 0;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 32);
  throttledIncr();
  throttledIncr.cancel();
  throttledIncr();
  throttledIncr();
  t.is(counter, 2, 'incr was called immediately');
  await delay(64);

  t.is(counter, 3, 'incr was throttled');
});

test('throttle cancel with leading: false', async t => {
  let counter = 0;
  const incr = () => counter++;
  const throttledIncr = l.throttle(incr, 32, { leading: false });
  throttledIncr();
  throttledIncr.cancel();
  t.is(counter, 0, 'incr was throttled');
  await delay(64);

  t.is(counter, 0, 'incr was throttled');
});
