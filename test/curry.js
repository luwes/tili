import test from 'ava';
import * as l from '../src';

test('curries a single value', function(t) {
  var f = l.curry(function(a, b, c, d) {
    return (a + b * c) / d;
  }); // f(12, 3, 6, 2) == 15
  var g = f(12);
  t.is(g(3, 6, 2), 15);
});

test('curries multiple values', function(t) {
  var f = l.curry(function(a, b, c, d) {
    return (a + b * c) / d;
  }); // f(12, 3, 6, 2) == 15
  var g = f(12, 3);
  t.is(g(6, 2), 15);
  var h = f(12, 3, 6);
  t.is(h(2), 15);
});

test('allows further currying of a curried function', function(t) {
  var f = l.curry(function(a, b, c, d) {
    return (a + b * c) / d;
  }); // f(12, 3, 6, 2) == 15
  var g = f(12);
  t.is(g(3, 6, 2), 15);
  var h = g(3);
  t.is(h(6, 2), 15);
  t.is(g(3, 6)(2), 15);
});

test('properly reports the length of the curried function', function(t) {
  var f = l.curry(function(a, b, c, d) {
    return (a + b * c) / d;
  });
  t.is(f.length, 4);
  var g = f(12);
  t.is(g.length, 3);
  var h = g(3);
  t.is(h.length, 2);
  t.is(g(3, 6).length, 1);
});

test('preserves context', function(t) {
  var ctx = { x: 10 };
  var f = function(a, b) {
    return a + b * this.x;
  };
  var g = l.curry(f);

  t.is(g.call(ctx, 2, 4), 42);
  t.is(g.call(ctx, 2).call(ctx, 4), 42);
});

test('supports l.__ placeholder', function(t) {
  var f = function(a, b, c) {
    return [a, b, c];
  };
  var g = l.curry(f);
  var _ = l.__;

  t.deepEqual(g(1)(2)(3), [1, 2, 3]);
  t.deepEqual(g(1)(2, 3), [1, 2, 3]);
  t.deepEqual(g(1, 2)(3), [1, 2, 3]);
  t.deepEqual(g(1, 2, 3), [1, 2, 3]);

  t.deepEqual(g(_, 2, 3)(1), [1, 2, 3]);
  t.deepEqual(g(1, _, 3)(2), [1, 2, 3]);
  t.deepEqual(g(1, 2, _)(3), [1, 2, 3]);

  t.deepEqual(g(1, _, _)(2)(3), [1, 2, 3]);
  t.deepEqual(g(_, 2, _)(1)(3), [1, 2, 3]);
  t.deepEqual(g(_, _, 3)(1)(2), [1, 2, 3]);

  t.deepEqual(g(1, _, _)(2, 3), [1, 2, 3]);
  t.deepEqual(g(_, 2, _)(1, 3), [1, 2, 3]);
  t.deepEqual(g(_, _, 3)(1, 2), [1, 2, 3]);

  t.deepEqual(g(1, _, _)(_, 3)(2), [1, 2, 3]);
  t.deepEqual(g(_, 2, _)(_, 3)(1), [1, 2, 3]);
  t.deepEqual(g(_, _, 3)(_, 2)(1), [1, 2, 3]);

  t.deepEqual(g(_, _, _)(_, _)(_)(1, 2, 3), [1, 2, 3]);
  t.deepEqual(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
});

test('supports @@functional/placeholder', function(t) {
  var f = function(a, b, c) {
    return [a, b, c];
  };
  var g = l.curry(f);
  var _ = { '@@functional/placeholder': true, x: Math.random() };

  t.deepEqual(g(1)(2)(3), [1, 2, 3]);
  t.deepEqual(g(1)(2, 3), [1, 2, 3]);
  t.deepEqual(g(1, 2)(3), [1, 2, 3]);
  t.deepEqual(g(1, 2, 3), [1, 2, 3]);

  t.deepEqual(g(_, 2, 3)(1), [1, 2, 3]);
  t.deepEqual(g(1, _, 3)(2), [1, 2, 3]);
  t.deepEqual(g(1, 2, _)(3), [1, 2, 3]);

  t.deepEqual(g(1, _, _)(2)(3), [1, 2, 3]);
  t.deepEqual(g(_, 2, _)(1)(3), [1, 2, 3]);
  t.deepEqual(g(_, _, 3)(1)(2), [1, 2, 3]);

  t.deepEqual(g(1, _, _)(2, 3), [1, 2, 3]);
  t.deepEqual(g(_, 2, _)(1, 3), [1, 2, 3]);
  t.deepEqual(g(_, _, 3)(1, 2), [1, 2, 3]);

  t.deepEqual(g(1, _, _)(_, 3)(2), [1, 2, 3]);
  t.deepEqual(g(_, 2, _)(_, 3)(1), [1, 2, 3]);
  t.deepEqual(g(_, _, 3)(_, 2)(1), [1, 2, 3]);

  t.deepEqual(g(_, _, _)(_, _)(_)(1, 2, 3), [1, 2, 3]);
  t.deepEqual(g(_, _, _)(1, _, _)(_, _)(2, _)(_)(3), [1, 2, 3]);
});

test('forwards extra arguments', function(t) {
  var f = function(a, b, c) {
    void c;
    return Array.prototype.slice.call(arguments);
  };
  var g = l.curry(f);

  t.deepEqual(g(1, 2, 3), [1, 2, 3]);
  t.deepEqual(g(1, 2, 3, 4), [1, 2, 3, 4]);
  t.deepEqual(g(1, 2)(3, 4), [1, 2, 3, 4]);
  t.deepEqual(g(1)(2, 3, 4), [1, 2, 3, 4]);
  t.deepEqual(g(1)(2)(3, 4), [1, 2, 3, 4]);
});
