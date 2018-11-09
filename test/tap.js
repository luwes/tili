import test from 'ava';
import * as l from '../src';

test('tap', function(t) {
  let value;
  const sayX = x => {
    value = x;
  };
  l.tap(sayX, 100);
  t.is(value, 100);
});
