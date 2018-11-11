import test from 'ava';
import * as l from '../src';

test('pipes from left to right', t => {
  const double = x => x * 2;
  const square = x => x * x;
  t.is(l.pipe(square)(5), 25);
  t.is(
    l.pipe(
      square,
      double
    )(5),
    50
  );
  t.is(
    l.pipe(
      double,
      square,
      double
    )(5),
    200
  );
});

test('pipes functions from left to right', t => {
  const a = next => x => next('a' + x);
  const b = next => x => next('b' + x);
  const c = next => x => next('c' + x);
  const final = x => x;

  t.is(
    l.pipe(
      a,
      b,
      c
    )(final)(''),
    'abc'
  );
  t.is(
    l.pipe(
      b,
      c,
      a
    )(final)(''),
    'bca'
  );
  t.is(
    l.pipe(
      c,
      a,
      b
    )(final)(''),
    'cab'
  );
});

test('throws at runtime if argument is not a function', t => {
  const square = x => x * x;
  const add = (x, y) => x + y;

  t.throws(() =>
    l.pipe(
      square,
      add,
      false
    )(1, 2)
  );
  t.throws(() =>
    l.pipe(
      square,
      add,
      undefined
    )(1, 2)
  );
  t.throws(() =>
    l.pipe(
      square,
      add,
      true
    )(1, 2)
  );
  t.throws(() =>
    l.pipe(
      square,
      add,
      NaN
    )(1, 2)
  );
  t.throws(() =>
    l.pipe(
      square,
      add,
      '42'
    )(1, 2)
  );
});

test('can be seeded with multiple arguments', t => {
  const square = x => x * x;
  const add = (x, y) => x + y;
  t.is(
    l.pipe(
      add,
      square
    )(1, 2),
    9
  );
});

test('returns the first given argument if given no functions', t => {
  t.is(l.pipe()(1, 2), 1);
  t.is(l.pipe()(3), 3);
  t.is(l.pipe()(), undefined);
});

test('returns the first function if given only one', t => {
  const fn = () => {};

  t.is(l.pipe(fn), fn);
});
