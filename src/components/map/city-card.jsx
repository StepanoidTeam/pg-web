import React from 'react';

import './city-card.css';

function CitySlot(props) {
  const { cost } = props;
  return <div className="city-slot text-stroke">{cost}</div>;
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
      <div className="city-name">{name}</div>
      <div className="city-rows flex-column">
        <div className="city-slots flex-row">
          {[10, 15, 20].map(cost => CitySlot({ cost }))}
        </div>
        <div className="city-slots flex-row">
          {[10, 15, 20].map(cost => CitySlot({ cost }))}
        </div>
      </div>
    </div>
  );
}
