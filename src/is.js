export default function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor);
}
