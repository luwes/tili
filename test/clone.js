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
