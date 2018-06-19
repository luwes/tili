import test from 'ava';
import * as _ from '../src';

var obj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

test('copies an object omitting the listed properties', function(t) {
  t.deepEqual(_.omit(['a', 'c', 'f'], obj), {b: 2, d: 4, e: 5});
});

test('includes prototype properties', function(t) {
  var F = function(param) {this.x = param;};
  F.prototype.y = 40; F.prototype.z = 50;
  var obj = new F(30);
  obj.v = 10; obj.w = 20;
  t.deepEqual(_.omit(['w', 'x', 'y'], obj), {v: 10, z: 50});
});
