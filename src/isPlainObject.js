export default function isPlainObject(o) {
  return typeof o === 'object' && o.constructor === Object;
}
