/**
 * Curry a function by argument length.
 * @param  {Number}    length
 * @param  {Function}  fn
 * @param  {...Function} args
 * @return {Function}
 */
export default function curryN(length, fn, ...args) {
  const _curry = fnArgs => {
    if (fnArgs.length >= length) {
      return fn.apply(this, fnArgs);
    }
    return (...cArgs) => _curry([...fnArgs, ...cArgs]);
  };
  return _curry(args);
}
