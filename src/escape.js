import _curry1 from './internal/_curry1.js';

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @func
 * @memberOf tili
 * @since 0.7.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @see escapeRegExp, unescape
 * @example
 *
 *    escape('fred, barney, & pebbles')
 *    // => 'fred, barney, &amp; pebbles'
 */
const escape = _curry1(function escape(string) {
  /* Used to map characters to HTML entities. */
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /* Used to match HTML entities and HTML characters. */
  const reUnescapedHtml = /[&<>"']/g;
  const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  return string && reHasUnescapedHtml.test(string)
    ? string.replace(reUnescapedHtml, chr => htmlEscapes[chr])
    : string;
});

export default escape;
