import test from 'ava';
import * as l from '../src';

test('hasPath', function(t) {
  t.truthy(
    l.hasPath(['person', 'name'], { person: { name: 'bob' } }),
    'has a property name'
  );
  t.falsy(
    l.hasPath(['person', 'name'], { person: { age: 23 } }),
    'not has a property age'
  );
  t.falsy(
    l.hasPath([], { person: { age: 23 } }),
    'path is empty returns false'
  );
});
