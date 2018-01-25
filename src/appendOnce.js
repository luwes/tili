export default function appendOnce(parent, element) {
  parent = parent || document.body;
  return parent.contains(element) ? element : parent.appendChild(element);
}
