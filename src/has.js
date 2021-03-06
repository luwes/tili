import _curry2 from './internal/_curry2.js';
import hasPath from './hasPath.js';

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf tili
 * @since v0.11.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      const hasName = has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      const point = {x: 0, y: 0};
 *      const pointHas = has(__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */
const has = _curry2(function has(prop, obj) {
  return hasPath([prop], obj);
});

export default has;
