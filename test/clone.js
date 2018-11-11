import test from 'ava';
import * as l from '../src';

test('clones integers', function(t) {
  t.is(l.clone(-4), -4);
  t.is(l.clone(9007199254740991), 9007199254740991);
});

test('clones floats', function(t) {
  t.is(l.clone(-4.5), -4.5);
  t.is(l.clone(0.0), 0.0);
});

test('clones strings', function(t) {
  t.is(l.clone('ramda'), 'ramda');
});

test('clones booleans', function(t) {
  t.is(l.clone(true), true);
});

test('clones shallow object', function(t) {
  var obj = { a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25) };
  var clone = l.clone(obj);
  obj.c = false;
  obj.d.setDate(31);
  t.deepEqual(clone, { a: 1, b: 'ramda', c: true, d: new Date(2013, 11, 25) });
});

test('clones deep object', function(t) {
  var obj = { a: { b: { c: 'ramda' } } };
  var clone = l.clone(obj);
  obj.a.b.c = null;
  t.deepEqual(clone, { a: { b: { c: 'ramda' } } });
});

test('clones objects with circular references', function(t) {
  var x = { c: null };
  var y = { a: x };
  var z = { b: y };
  x.c = z;
  var clone = l.clone(x);
  t.not(x, clone);
  t.not(x.c, clone.c);
  t.not(x.c.b, clone.c.b);
  t.not(x.c.b.a, clone.c.b.a);
  t.not(x.c.b.a.c, clone.c.b.a.c);
  t.deepEqual(Object.keys(clone), Object.keys(x));
  t.deepEqual(Object.keys(clone.c), Object.keys(x.c));
  t.deepEqual(Object.keys(clone.c.b), Object.keys(x.c.b));
  t.deepEqual(Object.keys(clone.c.b.a), Object.keys(x.c.b.a));
  t.deepEqual(Object.keys(clone.c.b.a.c), Object.keys(x.c.b.a.c));

  x.c.b = 1;
  t.notDeepEqual(clone.c.b, x.c.b);
});

test('clone instances', function(t) {
  var Obj = function(x) {
    this.x = x;
  };
  Obj.prototype.get = function() {
    return this.x;
  };
  Obj.prototype.set = function(x) {
    this.x = x;
  };

  var obj = new Obj(10);
  t.deepEqual(obj.get(), 10);

  var clone = l.clone(obj);
  t.deepEqual(clone.get(), 10);

  t.not(obj, clone);

  obj.set(11);
  t.deepEqual(obj.get(), 11);
  t.deepEqual(clone.get(), 10);
});

test('clones shallow arrays', function(t) {
  var list = [1, 2, 3];
  var clone = l.clone(list);
  list.pop();
  t.deepEqual(clone, [1, 2, 3]);
});

test('clones deep arrays', function(t) {
  var list = [1, [1, 2, 3], [[[5]]]];
  var clone = l.clone(list);

  t.not(list, clone);
  t.not(list[2], clone[2]);
  t.not(list[2][0], clone[2][0]);

  t.deepEqual(clone, [1, [1, 2, 3], [[[5]]]]);
});

test('clones Date object', function(t) {
  var date = new Date(2014, 10, 14, 23, 59, 59, 999);

  var clone = l.clone(date);

  t.not(date, clone);
  t.deepEqual(clone, new Date(2014, 10, 14, 23, 59, 59, 999));

  t.deepEqual(clone.getDay(), 5); // friday
});

test('clones RegExp object', function(t) {
  [/x/, /x/g, /x/i, /x/m, /x/gi, /x/gm, /x/im, /x/gim].forEach(function(
    pattern
  ) {
    var clone = l.clone(pattern);
    t.not(clone, pattern);
    t.deepEqual(clone.constructor, RegExp);
    t.deepEqual(clone.source, pattern.source);
    t.deepEqual(clone.global, pattern.global);
    t.deepEqual(clone.ignoreCase, pattern.ignoreCase);
    t.deepEqual(clone.multiline, pattern.multiline);
  });
});

test('clones array with objects', function(t) {
  var list = [{ a: { b: 1 } }, [{ c: { d: 1 } }]];
  var clone = l.clone(list);
  list[1][0] = null;
  t.deepEqual(clone, [{ a: { b: 1 } }, [{ c: { d: 1 } }]]);
});

test('clones array with arrays', function(t) {
  var list = [[1], [[3]]];
  var clone = l.clone(list);
  list[1][0] = null;
  t.deepEqual(clone, [[1], [[3]]]);
});

test('clones array with mutual ref object', function(t) {
  var obj = { a: 1 };
  var list = [{ b: obj }, { b: obj }];
  var clone = l.clone(list);

  t.is(list[0].b, list[1].b);
  t.is(clone[0].b, clone[1].b);
  t.not(clone[0].b, list[0].b);
  t.not(clone[1].b, list[1].b);

  t.deepEqual(clone[0].b, { a: 1 });
  t.deepEqual(clone[1].b, { a: 1 });

  obj.a = 2;
  t.deepEqual(clone[0].b, { a: 1 });
  t.deepEqual(clone[1].b, { a: 1 });
});

test('nulls, undefineds and empty objects and arrays', function(t) {
  t.deepEqual(l.clone(null), null);
  t.deepEqual(l.clone(undefined), undefined);
  t.not(l.clone(undefined), null);

  var obj = {};
  t.not(l.clone(obj), obj);

  var list = [];
  t.not(l.clone(list), list);
});

test('dispatches to `clone` method if present', function(t) {
  function ArbitraryClone(x) {
    this.value = x;
  }
  ArbitraryClone.prototype.clone = function() {
    return new ArbitraryClone(this.value);
  };

  var obj = new ArbitraryClone(42);
  var arbitraryClonedObj = l.clone(obj);
  t.deepEqual(arbitraryClonedObj, new ArbitraryClone(42));
  t.deepEqual(arbitraryClonedObj instanceof ArbitraryClone, true);
});
