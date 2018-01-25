export default function qsa(element, selector) {
  element = element || document;
  return element.querySelectorAll(selector);
}
