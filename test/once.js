import test from 'ava';
import * as l from '../src';

test('returns a function that calls the supplied function only the first time called', function(t) {
  var ctr = 0;
  var fn = l.once(function() {
    ctr += 1;
  });
  fn();
  t.is(ctr, 1);
  fn();
  t.is(ctr, 1);
  fn();
  t.is(ctr, 1);
});

test('passes along arguments supplied', function(t) {
  var fn = l.once(function(a, b) {
    return a + b;
  });
  var result = fn(5, 10);
  t.is(result, 15);
});

test('retains and returns the first value calculated, even if different arguments are passed later', function(t) {
  var ctr = 0;
  var fn = l.once(function(a, b) {
    ctr += 1;
    return a + b;
  });
  var result = fn(5, 10);
  t.is(result, 15);
  t.is(ctr, 1);
  result = fn(20, 30);
  t.is(result, 15);
  t.is(ctr, 1);
});

test('retains arity', function(t) {
  var f = l.once(function(a, b) {
    return a + b;
  });
  t.is(f.length, 2);
});
