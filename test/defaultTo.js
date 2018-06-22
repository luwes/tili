import test from 'ava';
import * as l from '../src';

var defaultTo42 = l.curry(l.defaultTo)(42);

test('returns the default value if input is null, undefined or NaN', t => {
  t.is(42, defaultTo42(null));
  t.is(42, defaultTo42(undefined));
  t.is(42, defaultTo42(NaN));
});

test('returns the input value if it is not null/undefined', t => {
  t.is('a real value', defaultTo42('a real value'));
});

test('returns the input value even if it is considered falsy', t => {
  t.is('', defaultTo42(''));
  t.is(0, defaultTo42(0));
  t.is(false, defaultTo42(false));
  t.deepEqual([], defaultTo42([]));
});

test('can be called with both arguments directly', t => {
  t.is(42, l.defaultTo(42, null));
  t.is('a real value', l.defaultTo(42, 'a real value'));
});
