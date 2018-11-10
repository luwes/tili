import test from 'ava';
import * as l from '../src';

test('keys with native Object.keys', function(t) {
  var obj = {
    a: 100, b: [1, 2, 3], c: { x: 200, y: 300 }, d: 'D', e: null, f: undefined
  };

  t.deepEqual(l.keys(obj).sort(), ['a', 'b', 'c', 'd', 'e', 'f']);

  function C() {
    this.a = 100;
    this.b = 200;
  }
  C.prototype.x = function() {
    return 'x';
  };
  C.prototype.y = 'y';
  var cobj = new C();

  t.deepEqual(
    l.keys(cobj).sort(),
    ['a', 'b'],
    'does not include the given object\'s prototype properties'
  );
});

test('keys with non-object', function(t) {
  t.deepEqual(l.keys(123), []);
});
