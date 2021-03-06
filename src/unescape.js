import _curry1 from './internal/_curry1.js';

/**
 * The inverse of `escape`this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to
 * their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional
 * HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @func
 * @memberOf tili
 * @since 0.7.0
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @return {string} Returns the unescaped string.
 * @see escape, escapeRegExp
 * @example
 *
 *    unescape('fred, barney, &amp; pebbles')
 *    // => 'fred, barney, & pebbles'
 */
const unescape = _curry1(function unescape(string) {
  /* Used to map HTML entities to characters. */
  const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /* Used to match HTML entities and HTML characters. */
  const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
  const reHasEscapedHtml = RegExp(reEscapedHtml.source);

  return string && reHasEscapedHtml.test(string)
    ? string.replace(reEscapedHtml, entity => htmlUnescapes[entity])
    : string;
});

export default unescape;
