/**
 * Get a single element from the DOM.
 * @param  {Element} element
 * @param  {string} selector
 * @return {Element}
 */
export default function qs(element, selector) {
  element = element || document;
  return element.querySelector(selector);
}
