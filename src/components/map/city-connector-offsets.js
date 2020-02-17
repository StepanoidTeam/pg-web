import { minBy } from 'lodash';
import { getDistance } from './math-helpers';

//init
const cityBlockSize = { width: 190, height: 150 }; //80
const cols = 3;
const rows = 1;

const cityConnectorOffsets = [];
const slotSize = {
  width: cityBlockSize.width / cols,
  height: cityBlockSize.height / rows,
};

for (let col = 0; col < cols; col++) {
  for (let row = 0; row < rows; row++) {
    cityConnectorOffsets.push({
      x: slotSize.width * (col - (cols - 1) / 2),
      y: slotSize.height * (row - (rows - 1) / 2),
    });
  }
}

function nearestConnection(from, to) {
  const fromOffsets = cityConnectorOffsets.map(cco => ({
    x: from.x + cco.x,
    y: from.y + cco.y,
  }));

  const toOffsets = cityConnectorOffsets.map(cco => ({
    x: to.x + cco.x,
    y: to.y + cco.y,
  }));

  //get all distances between
  const dists = [];

  fromOffsets.forEach(fromPoint => {
    toOffsets.forEach(toPoint => {
      dists.push([fromPoint, toPoint, getDistance(fromPoint, toPoint)]);
    });
  });

  const [nearestFrom, nearestTo, dist] = minBy(dists, ([, , dist]) => dist);

  return [nearestFrom, nearestTo, dist];
}

export { nearestConnection };
