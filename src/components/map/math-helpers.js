export function getDistance(from, to) {
  return ((from.x - to.x) ** 2 + (from.y - to.y) ** 2) ** 0.5;
}
