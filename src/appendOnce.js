/**
 * Appends an element only once to a parent.
 * @param  {element} parent
 * @param  {element} element
 * @return {element}
 */
export default function appendOnce(parent, element) {
  parent = parent || document.body;
  return parent.contains(element) ? element : parent.appendChild(element);
}
