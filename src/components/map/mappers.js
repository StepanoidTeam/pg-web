export const regions = [
  'red',
  'teal',
  'brown',
  'yellow',
  'green',
  'violet',
  'orange',
];

export const modificator = { x: 2, y: 3 };

export function mapCity(city) {
  const { CoordX: x, CoordY: y, Name: name, RegionKey: region, Id: id } = city;

  return {
    x: x * modificator.x,
    y: y * modificator.y,
    id,
    name,
    region,
    ...city,
  };
}

export function mapConnector(connector) {
  const { City1Key: from, City2Key: to, Cost: cost, Id: id } = connector;

  return { from, to, cost, id, ...connector };
}

// Connectors: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
// CoordX: 865
// CoordY: 435
// EntityType: "City"
// Id: "kansascity"
// Levels: (3) [10, 15, 20]
// Name: "Kansas City"
// RegionName: "Red"
// RegionKey: "red"

// x,y,id,name

// City1Key: "portland"
// City1Name: "Portland"
// City2Key: "seattle"
// City2Name: "Seattle"
// Cost: 3
// EntityType: "Connector"
// Id: "[seattle]_TO_[portland]"

// from,to,cost,id,
