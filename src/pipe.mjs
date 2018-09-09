/**
 * Pipes single-argument functions from left to right. The leftmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @func
 * @since v0.10.0
 * @category Function
 * @param {...Function} funcs - The functions to compose.
 * @return {Function} - A function obtained by composing the argument functions
 * from left to right. For example, pipe(f, g, h) is identical to doing
 * (...args) => h(g(f(...args))).
 */
function pipe(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => b(a(...args)));
}

export default pipe;
