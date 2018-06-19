import test from 'ava';
import * as _ from '../src';

test('tap', function(t) {
  let value;
  const sayX = x => {
    value = x;
  };
  _.tap(sayX, 100);
  t.is(value, 100);
});
