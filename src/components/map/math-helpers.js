/**
 * returns distance between two points
 * @param {{x:number, y:number}} from
 * @param {{x:number, y:number}} to
 */
export function getDistance(from, to) {
  return ((from.x - to.x) ** 2 + (from.y - to.y) ** 2) ** 0.5;
}

/**
 * returns point between two other points
 * @param {{x:number, y:number}} from
 * @param {{x:number, y:number}} to
 */
export function getMiddlePoint(from, to) {
  return { x: from.x + (to.x - from.x) / 2, y: from.y + (to.y - from.y) / 2 };
}
