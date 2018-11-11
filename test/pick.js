import test from 'ava';
import * as l from '../src';

var obj = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, 1: 7 };

test('copies the named properties of an object to the new object', function(t) {
  t.deepEqual(l.pick(['a', 'c', 'f'], obj), { a: 1, c: 3, f: 6 });
});

test('handles numbers as properties', function(t) {
  t.deepEqual(l.pick([1], obj), { 1: 7 });
});

test('ignores properties not included', function(t) {
  t.deepEqual(l.pick(['a', 'c', 'g'], obj), { a: 1, c: 3 });
});

test('retrieves prototype properties', function(t) {
  var F = function(param) {
    this.x = param;
  };
  F.prototype.y = 40;
  F.prototype.z = 50;
  var obj = new F(30);
  obj.v = 10;
  obj.w = 20;
  t.deepEqual(l.pick(['w', 'x', 'y'], obj), { w: 20, x: 30, y: 40 });
});
