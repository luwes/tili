import test from 'ava';
import * as l from '../src';

test('hasPath', function(t) {
  t.true(
    l.hasPath(['person', 'name'], { person: { name: 'bob' } }),
    'has a property name'
  );
  t.false(
    l.hasPath(['person', 'name'], { person: { age: 23 } }),
    'not has a property age'
  );
  t.true(
    l.hasPath(['person', 'age'], { person: { age: undefined } }),
    'has a property age'
  );
  t.false(
    l.hasPath([], { person: { age: 23 } }),
    'path is empty returns false'
  );
});
