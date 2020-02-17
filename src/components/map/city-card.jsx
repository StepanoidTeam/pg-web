import React from 'react';

import './city-card.css';

function CitySlot(props) {
  const { cost } = props;
  return <div className="city-slot m-1 text-stroke">{cost}</div>;
}

export default function CityCard(props) {
  const { x, y, name } = props;

  return (
    <div
      style={{
        left: x,
        top: y,
      }}
      className="city-card"
    >
      <div className="city-rows flex-column p-1">
        <div className="city-slots flex-row">
          {[10, 15, 20].map(cost => (
            <CitySlot key={cost} cost={cost} />
          ))}
        </div>
        <div className="position-relative">
          <div className="overlay flex-row align-center justify-center">
            <div className="city-name px-1 text-stroke">{name}</div>
          </div>
        </div>
        <div className="city-slots flex-row" hidden={Math.random() * 10 > 5}>
          {[10, 15, 20].map(cost => (
            <CitySlot key={cost} cost={cost} />
          ))}
        </div>
      </div>
    </div>
  );
}