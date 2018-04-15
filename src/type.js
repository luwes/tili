/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @param  {*} val - The value to test
 * @return {String}
 * @example
 *
 *      type({}); //=> "Object"
 *      type(1); //=> "Number"
 *      type(false); //=> "Boolean"
 *      type('s'); //=> "String"
 *      type(null); //=> "Null"
 *      type([]); //=> "Array"
 *      type(/[A-z]/); //=> "RegExp"
 *      type(() => {}); //=> "Function"
 *      type(undefined); //=> "Undefined"
 */
export default function type(val) {
  return val === null
    ? 'Null'
    : val === undefined
      ? 'Undefined'
      : Object.prototype.toString.call(val).slice(8, -1);
}
