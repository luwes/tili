import test from 'ava';
import * as l from '../src';

test('has', function(t) {
  t.truthy(l.has('name', { name: 'bob' }), 'has a property name');
  t.falsy(l.has('name', { age: 23 }), 'not has a property age');
});
