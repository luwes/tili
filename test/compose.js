import test from 'ava';
import * as l from '..';

test('composes from right to left', t => {
  const double = x => x * 2;
  const square = x => x * x;
  t.is(l.compose(square)(5), 25);
  t.is(l.compose(square, double)(5), 100);
  t.is(l.compose(double, square, double)(5), 200);
});

test('composes functions from right to left', t => {
  const a = next => x => next(x + 'a');
  const b = next => x => next(x + 'b');
  const c = next => x => next(x + 'c');
  const final = x => x;

  t.is(l.compose(a, b, c)(final)(''), 'abc');
  t.is(l.compose(b, c, a)(final)(''), 'bca');
  t.is(l.compose(c, a, b)(final)(''), 'cab');
});

test('throws at runtime if argument is not a function', t => {
  const square = x => x * x;
  const add = (x, y) => x + y;

  t.throws(() => l.compose(square, add, false)(1, 2));
  t.throws(() => l.compose(square, add, undefined)(1, 2));
  t.throws(() => l.compose(square, add, true)(1, 2));
  t.throws(() => l.compose(square, add, NaN)(1, 2));
  t.throws(() => l.compose(square, add, '42')(1, 2));
});

test('can be seeded with multiple arguments', t => {
  const square = x => x * x;
  const add = (x, y) => x + y;
  t.is(l.compose(square, add)(1, 2), 9);
});

test('returns the first given argument if given no functions', t => {
  t.is(l.compose()(1, 2), 1);
  t.is(l.compose()(3), 3);
  t.is(l.compose()(), undefined);
});

test('returns the first function if given only one', t => {
  const fn = () => {};

  t.is(l.compose(fn), fn);
});
