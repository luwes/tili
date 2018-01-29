/**
 * Get a nodelist from the DOM.
 * @param  {Element} element
 * @param  {string} selector
 * @return {NodeList}
 */
export default function qsa(element, selector) {
  element = element || document;
  return element.querySelectorAll(selector);
}
