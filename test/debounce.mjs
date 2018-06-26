import test from 'ava';
import delay from 'delay';
import * as l from '../src';

test.serial('debounce', async t => {
  var counter = 0;
  const incr = () => counter++;
  const debouncedIncr = l.debounce(32, incr);
  debouncedIncr();
  debouncedIncr();
  await delay(16);
  debouncedIncr();
  await delay(96);
  t.is(counter, 1, 'incr was debounced');
});

test.serial('debounce cancel', async t => {
  var counter = 0;
  const incr = () => counter++;
  const debouncedIncr = l.debounce(32, incr);
  debouncedIncr();
  debouncedIncr.cancel();
  await delay(96);
  t.is(counter, 0, 'incr was not called');
});

test.serial('debounce asap', async t => {
  var a, b, c;
  var counter = 0;
  const incr = () => ++counter;
  const debouncedIncr = l.debounce(64, incr, true);
  a = debouncedIncr();
  b = debouncedIncr();
  t.is(a, 1);
  t.is(b, 1);
  t.is(counter, 1, 'incr was called immediately');

  await delay(16);
  debouncedIncr();
  await delay(16);
  debouncedIncr();
  await delay(16);
  debouncedIncr();
  await delay(80);
  t.is(counter, 1, 'incr was debounced');
  c = debouncedIncr();
  t.is(c, 2);
  t.is(counter, 2, 'incr was called again');
});

test.serial('debounce asap cancel', async t => {
  var a, b;
  var counter = 0;
  const incr = () => ++counter;
  const debouncedIncr = l.debounce(64, incr, true);
  a = debouncedIncr();
  debouncedIncr.cancel();
  b = debouncedIncr();
  t.is(a, 1);
  t.is(b, 2);
  t.is(counter, 2, 'incr was called immediately');

  await delay(16);
  debouncedIncr();
  await delay(16);
  debouncedIncr();
  await delay(16);
  await delay(80);
  t.is(counter, 2, 'incr was debounced');
});

test.serial('debounce asap recursively', async t => {
  var counter = 0;
  const debouncedIncr = l.debounce(
    32,
    () => {
      counter++;
      if (counter < 10) debouncedIncr();
    },
    true
  );

  debouncedIncr();
  t.is(counter, 1, 'incr was called immediately');
  await delay(96);
  t.is(counter, 1, 'incr was debounced');
});

test.serial('debounce re-entrant', async t => {
  const sequence = [['b1', 'b2']];
  let value = '';
  let debouncedAppend;

  const append = function(arg) {
    value += this + arg;
    var args = sequence.pop();
    if (args) {
      debouncedAppend.call(args[0], args[1]);
    }
  };

  debouncedAppend = l.debounce(32, append);
  debouncedAppend.call('a1', 'a2');
  t.is(value, '');

  await delay(100);
  t.is(value, 'a1a2b1b2', 'append was debounced successfully');
});
