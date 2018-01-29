/**
 * Throttle a function.
 * @param  {Function} fn
 * @param  {Number}   wait
 * @param  {Object}   options
 * @param  {Boolean=true} options.leading - Trigger a leading function call.
 * @param  {Boolean=true} options.trailing - Trigger a trailing function call.
 * @return {Function}
 */
export default function throttle(fn, wait, options = {}) {
  let timeout, context, args, result;
  let previous = 0;

  const later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = fn.apply(context, args);
    if (!timeout) context = args = null;
  };

  const throttled = function() {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
