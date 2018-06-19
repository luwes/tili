import test from 'ava';
import * as l from '../src';

test('memoize', function(t) {
  var fib = function(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
  };
  t.is(fib(10), 55, 'a memoized version of fibonacci produces identical results');
  fib = l.memoize(fib); // Redefine `fib` for memoization
  t.is(fib(10), 55, 'a memoized version of fibonacci produces identical results');

  var o = function(str) {
    return str;
  };
  var fastO = l.memoize(o);
  t.is(o('toString'), 'toString', 'checks hasOwnProperty');
  t.is(fastO('toString'), 'toString', 'checks hasOwnProperty');
});
