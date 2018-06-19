import test from 'ava';
import * as _ from '../src';

test('clones integers', function(t) {
  t.is(_.clone(-4), -4);
  t.is(_.clone(9007199254740991), 9007199254740991);
});

test('clones floats', function(t) {
  t.is(_.clone(-4.5), -4.5);
  t.is(_.clone(0.0), 0.0);
});

test('clones strings', function(t) {
  t.is(_.clone('ramda'), 'ramda');
});

test('clones booleans', function(t) {
  t.is(_.clone(true), true);
});

test('clones objects', function(t) {
  t.deepEqual(_.clone({ a: { b: 1 }}), { a: { b: 1 }});
});

test('uses the clone method if exists', function(t) {
  const obj = {
    a: 5,
    clone() {
      return 1;
    }
  };
  t.is(_.clone(obj), 1);
});
