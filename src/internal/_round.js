/**
 * Creates a function like `round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @return {Function} Returns the new round function.
 */
function _round(methodName) {
  const fn = Math[methodName];
  return (precision, number) => {
    precision = precision == null ? 0 : Math.min(precision, 292);
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${number}e`.split('e');
      const value = fn(`${pair[0]}e${+pair[1] + precision}`);

      pair = `${value}e`.split('e');
      return +`${pair[0]}e${+pair[1] - precision}`;
    }
    return fn(number);
  };
}

export default _round;
