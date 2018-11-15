import test from 'ava';
import * as l from '../src';
import vm from 'vm';

test('returns true only if plain object', t => {
  function Test() {
    this.prop = 1;
  }

  const sandbox = { fromAnotherRealm: false };
  vm.runInNewContext('fromAnotherRealm = {}', sandbox);

  t.is(l.isPlainObject(sandbox.fromAnotherRealm), true);
  t.is(l.isPlainObject(new Test()), false);
  t.is(l.isPlainObject(new Date()), false);
  t.is(l.isPlainObject([1, 2, 3]), false);
  t.is(l.isPlainObject(null), false);
  t.is(l.isPlainObject({ x: 1, y: 2 }), true);
});
