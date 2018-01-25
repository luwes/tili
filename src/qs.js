export default function qs(element, selector) {
  element = element || document;
  return element.querySelector(selector);
}
