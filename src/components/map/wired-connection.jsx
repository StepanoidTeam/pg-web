import React from 'react';
import connectionFromSvg from '../../assets/connection-from.svg';
import connectionToSvg from '../../assets/connection-to.svg';
import { nearestConnection } from './city-connector-offsets';

export default function WiredConnection(props) {
  const { from, to } = props;
  const [nearestFrom, nearestTo, distance] = nearestConnection(from, to);

  const angle =
    (Math.atan2(nearestTo.y - nearestFrom.y, nearestTo.x - nearestFrom.x) *
      180) /
    Math.PI;

  const wireOffset = { x: 0, y: -10 };
  const connectionOffset = { x: -60, y: -16 };
  const connectionSize = { width: 40, height: 30 };

  return (
    <g style={{ filter: 'url(#filter-shadow)' }}>
      <rect
        height="20"
        width={distance}
        x={nearestFrom.x}
        y={nearestFrom.y}
        viewBox="0 0 100 100"
        viewTarget="0 0 100 100"
        transform={`translate(${wireOffset.x} ${
          wireOffset.y
        }) rotate(${angle} ${nearestFrom.x - wireOffset.x} ${nearestFrom.y -
          wireOffset.y})`}
        style={{
          fill: 'url(#wires-pattern)',
        }}
      />

      {/* FROM */}
      <image
        x={nearestFrom.x}
        y={nearestFrom.y}
        width={connectionSize.width}
        height={connectionSize.height}
        xlinkHref={connectionFromSvg}
        transform={`translate(${-connectionOffset.x / 2.5} ${
          connectionOffset.y
        }) rotate(${angle} ${nearestFrom.x +
          connectionOffset.x / 2.5} ${nearestFrom.y - connectionOffset.y})`}
      />
      {/* TO */}
      <image
        x={nearestTo.x}
        y={nearestTo.y}
        width={connectionSize.width}
        height={connectionSize.height}
        xlinkHref={connectionToSvg}
        transform={`translate(${connectionOffset.x} ${
          connectionOffset.y
        }) rotate(${angle} ${nearestTo.x - connectionOffset.x} ${nearestTo.y -
          connectionOffset.y})`}
      />

      {/* <line
          x1={nearestFrom.x}
          y1={nearestFrom.y}
          x2={nearestTo.x}
          y2={nearestTo.y}
          stroke="lime"
          fill="url(#wires-pattern)"
          strokeWidth="3"
        /> */}

      {/* FROM */}
      <circle
        cx={nearestFrom.x}
        cy={nearestFrom.y}
        r="15"
        style={{ fill: 'greenyellow', opacity: 0.7 }}
      />
      {/* TO */}
      <circle
        cx={nearestTo.x}
        cy={nearestTo.y}
        r="15"
        style={{ fill: 'red', opacity: 0.7 }}
      />
    </g>
  );
}
