import test from 'ava';
import * as _ from '../src';

// *      isEmpty([1, 2, 3]);   //=> false
// *      isEmpty([]);          //=> true
// *      isEmpty('');          //=> true
// *      isEmpty(null);        //=> true
// *      isEmpty({});          //=> true
// *      isEmpty({length: 0}); //=> false

test('works like advertised', t => {
  t.falsy(_.isEmpty([1, 2, 3]));
  t.truthy(_.isEmpty([]));
  t.truthy(_.isEmpty(''));
  t.truthy(_.isEmpty(null));
  t.truthy(_.isEmpty({}));
  t.falsy(_.isEmpty({ length: 0 }));
});
