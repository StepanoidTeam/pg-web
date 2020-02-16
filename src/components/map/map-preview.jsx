import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGlobal } from '../../use-global';
import { getMap } from '../../services/map.service';

import './map.css';
import CityCard from './city-card';

import wiresSvg from '../../assets/wires-20.svg';
// import connectionFromSvg from '../../assets/connection-from.svg';
// import connectionToSvg from '../../assets/connection-to.svg';

function WiredConnection(props) {
  const { from, to } = props;
  const distance =
    ((from.CoordX - to.CoordX) ** 2 + (from.CoordY - to.CoordY) ** 2) ** 0.5;

  const angle =
    (Math.atan2(to.CoordY - from.CoordY, to.CoordX - from.CoordX) * 180) /
    Math.PI;

  const offset = { x: 0, y: -10 };

  return (
    <>
      <rect
        x={from.CoordX}
        y={from.CoordY}
        height="20"
        width={distance}
        transform={`translate(${offset.x} ${
          offset.y
        }) rotate(${angle} ${from.CoordX - offset.x} ${from.CoordY -
          offset.y})`}
        style={{
          // stroke: '#000000',
          fill: 'url(#wires-pattern)',
          //filter: 'url(#f1)',
        }}
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
    </>
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

            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceAlpha" dx="10" dy="10" />
              <feBlend in="SourceGraphic" mode="normal" />
            </filter>
          </defs>

          <circle cx="0" cy="0" r="20" style={{ fill: 'black' }} />

          <image x="50" y="50" width="20" height="20" xlinkHref={wiresSvg} />

          <WiredConnection from={seattle} to={billings} />
          <WiredConnection from={billings} to={sanFran} />
          <WiredConnection from={sanFran} to={seattle} />

          <g
            width="100"
            height="100"
            viewBox="0 0 50 50"
            preserveAspectRatio="xMinYMin meet"
            style={{ border: '1px solid #cccccc' }}
          >
            <circle
              cx="25"
              cy="25"
              r="25"
              style={{ stroke: '#000000', fill: 'none' }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
