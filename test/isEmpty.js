/* eslint no-unused-vars:0 */
import test from 'ava';
import * as l from '../src';

test('handles arrays', function(t) {
  t.true(l.isEmpty([]) == true);
  t.true(l.isEmpty(['a', 'b']) == false);
});

test('handles objects', function(t) {
  t.true(l.isEmpty({}) == true);
  t.true(l.isEmpty({ a: 'b' }) == false);
  t.true(l.isEmpty({ length: 0 }) == false);
});

test('handles strings', function(t) {
  t.true(l.isEmpty('') == true);
  t.true(l.isEmpty('string') == false);
  t.true(l.isEmpty('Error') == false);
});

test('handles numbers', function(t) {
  t.true(l.isEmpty(0) == true);
  t.true(l.isEmpty(42) == false);
});

test('handles functions', function(t) {
  t.true(l.isEmpty(function() {}) == true);
  t.true(l.isEmpty(function(a, b) {}) == false);
});

test('handles nulls', function(t) {
  t.true(l.isEmpty(null) == true);
  t.true(l.isEmpty(undefined) == true);
  t.true(l.isEmpty() == true);
});

test('handles booleans', function(t) {
  t.true(l.isEmpty(false) == false);
  t.true(l.isEmpty(true) == false);
});

test('handles maps', function(t) {
  t.true(l.isEmpty(new Map()) == true);
  t.true(l.isEmpty(new Map([['key', 'value']])) == false);
});

test('handles sets', function(t) {
  t.true(l.isEmpty(new Set()) == true);
  t.true(l.isEmpty(new Set([1, 2, 3, 4])) == false);
});

test('handles errors', function(t) {
  t.true(l.isEmpty(new Error()) == true);
  t.true(l.isEmpty(new Error('')) == true);
  t.true(l.isEmpty(new Error('test')) == false);
});

test('handles unknowns', function(t) {
  t.true(l.isEmpty(new Date()) == false);
});
