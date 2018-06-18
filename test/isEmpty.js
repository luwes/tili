import test from 'ava';
import * as l from '../src';

// *      isEmpty([1, 2, 3]);   //=> false
// *      isEmpty([]);          //=> true
// *      isEmpty('');          //=> true
// *      isEmpty(null);        //=> true
// *      isEmpty({});          //=> true
// *      isEmpty({length: 0}); //=> false

test('works like advertised', t => {
  t.falsy(l.isEmpty([1, 2, 3]));
  t.truthy(l.isEmpty([]));
  t.truthy(l.isEmpty(''));
  t.truthy(l.isEmpty(null));
  t.truthy(l.isEmpty({}));
  t.falsy(l.isEmpty({ length: 0 }));
});
