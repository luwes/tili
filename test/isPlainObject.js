import test from 'ava';
import * as _ from '../src';
import vm from 'vm';

test('returns true only if plain object', t => {
  function Test() {
    this.prop = 1;
  }

  const sandbox = { fromAnotherRealm: false };
  vm.runInNewContext('fromAnotherRealm = {}', sandbox);

  t.is(_.isPlainObject(sandbox.fromAnotherRealm), true);
  t.is(_.isPlainObject(new Test()), false);
  t.is(_.isPlainObject(new Date()), false);
  t.is(_.isPlainObject([1, 2, 3]), false);
  t.is(_.isPlainObject(null), false);
  t.is(_.isPlainObject(), false);
  t.is(_.isPlainObject({ x: 1, y: 2 }), true);
});
