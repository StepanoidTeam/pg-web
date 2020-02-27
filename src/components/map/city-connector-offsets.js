import { minBy } from 'lodash';
import { getDistance } from './math-helpers';

//init
const cityBlockSize = { width: 190, height: 150 }; //80

function generateConnectorOffsets(cols = 3, rows = 1) {
  const resultConnectorOffsets = [];

  const slotSize = {
    width: cityBlockSize.width / cols,
    height: cityBlockSize.height / rows,
  };

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      resultConnectorOffsets.push({
        x: slotSize.width * (col - (cols - 1) / 2),
        y: slotSize.height * (row - (rows - 1) / 2),
      });
    }
  }

  console.log(rows, 'co', JSON.stringify(resultConnectorOffsets));

  return resultConnectorOffsets;
}
export const city1row_co = generateConnectorOffsets(3, 1);
export const city2row_co = generateConnectorOffsets(3, 2);

// const vOffset = 25;
// const hOffset = 30;
// const yKeff = 0.7;
// const xKeff = 2;
// const cxKeff = 1;
// const cyKeff = 2.3;
// export const city1row_co = [
//   { x: -hOffset * cyKeff, y: 0 },

//   // { x: -hOffset * xKeff, y: -hOffset * yKeff },
//   { x: 0, y: -hOffset * cxKeff },
//   // { x: hOffset * xKeff, y: -hOffset * yKeff },

//   // { x: -hOffset * xKeff, y: hOffset * yKeff },
//   { x: 0, y: hOffset * cxKeff },
//   // { x: hOffset * xKeff, y: hOffset * yKeff },

//   { x: hOffset * cyKeff, y: 0 },
// ];

// export const city2row_co = [
//   { x: -hOffset * 2, y: -hOffset / 2 },
//   { x: 0, y: -40 },
//   { x: hOffset * 2, y: -hOffset / 2 },
//   //
//   { x: -hOffset * 2, y: hOffset / 2 },
//   { x: 0, y: 40 },
//   { x: hOffset * 2, y: hOffset / 2 },
// ];

function nearestConnection(from, to) {
  const fromOffsets = (from.isCapital ? city2row_co : city1row_co).map(cco => ({
    x: from.x + cco.x,
    y: from.y + cco.y,
  }));

  const toOffsets = (to.isCapital ? city2row_co : city1row_co).map(cco => ({
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
