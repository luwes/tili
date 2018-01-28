export default function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
}
