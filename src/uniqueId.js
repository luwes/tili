let idCounter = 0;
export default function uniqueId(prefix) {
  var id = ++idCounter;
  return `${prefix}${id}`;
}
