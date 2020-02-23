import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGlobal } from '../../use-global';
import { getMap } from '../../services/map.service';
import CityCard from './city-card';
import wiresSvg from '../../assets/wires-20.svg';
import WiredConnection from './wired-connection';
import initZoom from './zoom';

import './map.css';

// todo(vmyshko): force izya to update all namings to lowecase etc.
const modificator = { x: 2, y: 3 };
function patchXY(item) {
  const { CoordX: x, CoordY: y } = item;

  return { ...item, x: x * modificator.x, y: y * modificator.y };
}

export default function MapPreview() {
  const { mapId } = useParams();
  const [{ authToken }, {}] = useGlobal();

  const [cities, setCities] = useState([]);
  const [connectors, setConnectors] = useState([]);

  useEffect(() => {
    getMap(authToken, mapId).then(mapData => {
      console.log('🗾', mapData);
      window.mapData = mapData;

      setCities(mapData.Cities.map(patchXY));
      setConnectors(mapData.Connectors);

      initZoom();
    });
  }, []);

  if (!cities.length && !connectors.length) return <div>map preview here</div>;

  const updateCity = ({ Id, ...props }) => {
    const oldCity = cities.find(c => c.Id === Id);

    // console.log(props);

    const city = { ...oldCity, ...props };

    // console.log(oldCity, city);

    setCities([...cities.filter(c => c.Id !== Id), city]);

    //redraw
    setConnectors(connectors);
  };

  const mapSize = {
    width: 1650 * modificator.x,
    height: 950 * modificator.y,
  };

  return (
    <div>
      <h1>map</h1>
      cities
      <div className="map-overlay">
        <div className="map-content" style={mapSize}>
          <svg
            className="map-svg w-100 h-100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <pattern
                id="wires-pattern"
                height="100%"
                width="100%"
                viewBox="0 0 20 20"
                // patternUnits="userSpaceOnUse"
                patternContentUnits="objectBoundingBox"
                preserveAspectRatio="none"
                // preserveAspectRatio="xMidYMid slice"
              >
                <image
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid slice"
                  xlinkHref={wiresSvg}
                />
              </pattern>

              <filter id="filter-shadow-connection">
                <feDropShadow
                  stdDeviation="0 0"
                  dx="2"
                  dy="2"
                  floodColor="#00000040"
                />
              </filter>
              <filter id="filter-shadow-text select-none">
                <feDropShadow
                  stdDeviation="0 0"
                  dx="1"
                  dy="1"
                  floodColor="#000000cc"
                />
              </filter>
            </defs>

            {/* <circle cx="0" cy="0" r="20" style={{ fill: 'black' }} /> */}

            {connectors.map(conn => {
              const from = cities.find(city => city.Id === conn.City1Key);
              const to = cities.find(city => city.Id === conn.City2Key);

              return (
                <WiredConnection
                  key={conn.Id}
                  from={from}
                  to={to}
                  cost={conn.Cost}
                />
              );
            })}
            {/* <WiredConnection from={seattle} to={billings} cost={1} />
          <WiredConnection from={billings} to={sanFran} cost={9} />
          <WiredConnection from={sanFran} to={seattle} cost={20} /> */}
          </svg>

          {cities.map(city => {
            return (
              <CityCard
                key={city.Id}
                x={city.x}
                y={city.y}
                name={city.Name}
                region={city.RegionKey}
                onUpdateCity={props => updateCity({ Id: city.Id, ...props })}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
