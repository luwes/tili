import test from 'ava';
import * as l from '../src';

test('memoized version of fibonacci produces identical results', function(t) {
  var fib = function(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
  };

  t.is(fib(10), 55);
  fib = l.memoize(fib); // Redefine `fib` for memoization
  t.is(fib(10), 55);
});

test('memoize checks hasOwnProperty', function(t) {
  var o = function(str) {
    return str;
  };

  var fastO = l.memoize(o);
  t.is(o('toString'), 'toString');
  t.is(fastO('toString'), 'toString');
});

test('memoize multi argument function', function(t) {
  var sum = function(a, b, c) {
    return a + b + c;
  };

  t.is(sum(1, 2, 3), 6);
  sum = l.memoize(sum); // Redefine `sum` for memoization
  t.is(sum(1, 2, 3), 6);
  t.is(sum(1, 2, 3), 6);
  t.not(sum(1, 7, 3), 6);
});
