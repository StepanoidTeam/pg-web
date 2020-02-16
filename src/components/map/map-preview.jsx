import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGlobal } from '../../use-global';
import { getMap } from '../../services/map.service';

import './map.css';
import CityCard from './city-card';

import wiresSvg from '../../assets/wires-20.svg';
import connectionFromSvg from '../../assets/connection-from.svg';
import connectionToSvg from '../../assets/connection-to.svg';

function WiredConnection(props) {
  const { from, to } = props;
  const distance =
    ((from.CoordX - to.CoordX) ** 2 + (from.CoordY - to.CoordY) ** 2) ** 0.5;

  const angle =
    (Math.atan2(to.CoordY - from.CoordY, to.CoordX - from.CoordX) * 180) /
    Math.PI;

  const wireOffset = { x: 0, y: -10 };
  const connectionOffset = { x: -20, y: -16 };
  const connectionSize = { width: 40, height: 30 };

  return (
    <g style={{ filter: 'url(#filter-shadow)' }}>
      <rect
        height="20"
        width={distance}
        x={from.CoordX}
        y={from.CoordY}
        viewBox="0 0 100 100"
        viewTarget="0 0 100 100"
        transform={`translate(${wireOffset.x} ${
          wireOffset.y
        }) rotate(${angle} ${from.CoordX - wireOffset.x} ${from.CoordY -
          wireOffset.y})`}
        style={{
          fill: 'url(#wires-pattern)',
        }}
      />

      <image
        x={from.CoordX}
        y={from.CoordY}
        width={connectionSize.width}
        height={connectionSize.height}
        xlinkHref={connectionFromSvg}
        transform={`translate(${connectionOffset.x} ${
          connectionOffset.y
        }) rotate(${angle} ${from.CoordX - connectionOffset.x} ${from.CoordY -
          connectionOffset.y})`}
      />

      <image
        x={to.CoordX}
        y={to.CoordY}
        width={connectionSize.width}
        height={connectionSize.height}
        xlinkHref={connectionToSvg}
        transform={`translate(${connectionOffset.x} ${
          connectionOffset.y
        }) rotate(${angle} ${to.CoordX - connectionOffset.x} ${to.CoordY -
          connectionOffset.y})`}
      />

      {/* <line
        x1={from.CoordX}
        y1={from.CoordY}
        x2={to.CoordX}
        y2={to.CoordY}
        stroke="lime"
        fill="url(#wires-pattern)"
        strokeWidth="3"
      /> */}

      {/* <circle
        cx={from.CoordX}
        cy={from.CoordY}
        r="15"
        style={{ fill: 'red' }}
      />
      <circle cx={to.CoordX} cy={to.CoordY} r="15" style={{ fill: 'red' }} /> */}
    </g>
  );
}

export default function MapPreview() {
  const { mapId } = useParams();
  const [{ authToken }, {}] = useGlobal();

  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    getMap(authToken, mapId).then(mapData => {
      console.log(mapData);

      setMapData(mapData);
    });
  }, []);

  if (!mapData) return <div>map preview here</div>;

  const [seattle, boise, billings, sanFran] = [
    { CoordX: 105, CoordY: 70 },
    { CoordX: 270, CoordY: 245 },
    { CoordX: 510, CoordY: 180 },
    { CoordX: 60, CoordY: 465 },
  ];

  return (
    <div>
      <h1>map</h1>
      cities
      <div className="map-overlay">
        {mapData.Cities.map(c => {
          return <CityCard x={c.CoordX} y={c.CoordY} name={c.Name} />;
        })}

        <svg
          style={{
            position: 'absolute',
            backgroundColor: '#ffffff60',
            top: 0,
            left: 0,
          }}
          width="1500px"
          height="1500px"
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

            <filter id="filter-shadow">
              <feDropShadow
                stdDeviation="0 0"
                dx="2"
                dy="2"
                flood-color="#00000040"
              />
              {/* <feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />
              <feBlend in="SourceGraphic" mode="normal" /> */}
            </filter>
          </defs>

          {/* <circle cx="0" cy="0" r="20" style={{ fill: 'black' }} /> */}

          {/* <image x="50" y="50" width="20" height="20" xlinkHref={wiresSvg} /> */}

          <WiredConnection from={seattle} to={billings} />
          <WiredConnection from={billings} to={sanFran} />
          <WiredConnection from={sanFran} to={seattle} />
        </svg>
      </div>
    </div>
  );
}
