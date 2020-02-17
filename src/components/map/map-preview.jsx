import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGlobal } from '../../use-global';
import { getMap } from '../../services/map.service';

import './map.css';
import CityCard from './city-card';

import wiresSvg from '../../assets/wires-20.svg';
import WiredConnection from './wired-connection';

// todo(vmyshko): force izya to update all namings to lowecase etc.
const modificator = { x: 2, y: 3 };
function patchXY(item) {
  const { CoordX: x, CoordY: y } = item;

  return { ...item, x: x * modificator.x, y: y * modificator.y };
}

export default function MapPreview() {
  const { mapId } = useParams();
  const [{ authToken }, {}] = useGlobal();

  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    getMap(authToken, mapId).then(mapData => {
      console.log('🗾', mapData);
      window.mapData = mapData;
      setMapData(mapData);
    });
  }, []);

  if (!mapData) return <div>map preview here</div>;

  const [seattle, boise, billings, sanFran] = [
    { x: 105, y: 70 },
    { x: 270, y: 245 },
    { x: 510, y: 180 },
    { x: 60, y: 465 },
  ];

  return (
    <div>
      <h1>map</h1>
      cities
      <div className="map-overlay">
        <svg
          // hidden
          style={{
            position: 'absolute',
            // backgroundColor: '#ffffff60',
            boxShadow: 'inset 0 0 0 3px black',
            top: 0,
            left: 0,
            // todo(vmyshko): calc auto
            width: 1650 * modificator.x,
            height: 944 * modificator.y,
          }}
          //viewBox="-150 -150 150 150"
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
            <filter id="filter-shadow-text">
              <feDropShadow
                stdDeviation="0 0"
                dx="1"
                dy="1"
                floodColor="#000000cc"
              />
            </filter>
          </defs>

          {/* <circle cx="0" cy="0" r="20" style={{ fill: 'black' }} /> */}

          {mapData.Connectors.map(conn => {
            const from = mapData.Cities.find(city => city.Id === conn.City1Key);
            const to = mapData.Cities.find(city => city.Id === conn.City2Key);

            return (
              <WiredConnection
                key={conn.Id}
                from={patchXY(from)}
                to={patchXY(to)}
                cost={conn.Cost}
              />
            );
          })}
          {/* <WiredConnection from={seattle} to={billings} cost={1} />
          <WiredConnection from={billings} to={sanFran} cost={9} />
          <WiredConnection from={sanFran} to={seattle} cost={20} /> */}
        </svg>

        {mapData.Cities.map(city => {
          return (
            <CityCard
              key={city.Name}
              x={patchXY(city).x}
              y={patchXY(city).y}
              name={city.Name}
              region={city.RegionKey}
            />
          );
        })}
      </div>
    </div>
  );
}
