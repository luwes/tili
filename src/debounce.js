import delay from './delay';

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @func
 * @memberOf tili
 * @since v0.4.0
 * @category Function
 * @param  {Number} wait - Amount of milliseconds
 * @param  {Function} func
 * @param  {Boolean} [immediate=false]
 * @return {Function}
 */
function debounce(wait, func, immediate = false) {
  let timeout;
  let result;

  const later = function(context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  const debounced = function(...args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(wait, later, this, args);
    }

    return result;
  };

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

export default debounce;
