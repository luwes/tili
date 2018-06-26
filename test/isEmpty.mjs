import test from 'ava';
import * as l from '../src';

// *      isEmpty([1, 2, 3]);   //=> false
// *      isEmpty([]);          //=> true
// *      isEmpty('');          //=> true
// *      isEmpty(null);        //=> true
// *      isEmpty({});          //=> true
// *      isEmpty({length: 0}); //=> false

test('works like advertised', t => {
  t.false(l.isEmpty([1, 2, 3]));
  t.true(l.isEmpty([]));
  t.true(l.isEmpty(''));
  t.true(l.isEmpty(null));
  t.true(l.isEmpty({}));
  t.false(l.isEmpty({ length: 0 }));
  t.true(l.isEmpty(new Map()));
  t.false(l.isEmpty(new RegExp()));
});
