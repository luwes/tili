/**
 * Pipes single-argument functions from left to right. The leftmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf tili
 * @since v0.10.0
 * @category Function
 * @param {...Function} fns - The functions to compose.
 * @return {Function} - A function obtained by composing the argument functions
 * from left to right. For example, pipe(f, g, h) is identical to doing
 * (...args) => h(g(f(...args))).
 */
function pipe(...fns) {
  if (fns.length === 0) {
    return arg => arg;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduce((a, b) => (...args) => b(a(...args)));
}

export default pipe;
