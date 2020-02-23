import React, { useState } from 'react';

import Movable from './movable';

import './city-card.css';

function CitySlot(props) {
  const { cost } = props;
  return (
    <div className="city-slot m-1 text-stroke">
      <span className="select-none">{cost}</span>
    </div>
  );
}

export default function CityCard(props) {
  const { x, y, name, region, onUpdateCity } = props;

  const [cityName, setCityName] = useState(name);

  const [position, setPosition] = useState({ x, y });

  const changeCityName = () => {
    setCityName(prompt('set city name', cityName));
  };

  return (
    <Movable
      className="overlay flex-row justify-center align-center"
      style={{
        left: position.x,
        top: position.y,
      }}
      onDrag={pos => {
        setPosition(pos);
        onUpdateCity({ ...pos, Name: cityName });
      }}
      onDrop={() => {}}
      title={`${position.x},${position.y}`}
    >
      <div className="city-card">
        <div className="city-rows flex-column p-1">
          <div className="city-slots flex-row">
            {[10, 15, 20].map(cost => (
              <CitySlot key={cost} cost={cost} />
            ))}
          </div>
          <div className="position-relative">
            <div className="overlay w-100 h-100 flex-row align-center justify-center">
              <div
                className={`city-name region-${region} px-1 text-stroke select-none`}
                onClick={changeCityName}
              >
                {cityName}
              </div>
            </div>
          </div>
          <div
            className="city-slots flex-row"
            hidden
            //hidden={Math.random() * 10 > 5}
          >
            {[10, 15, 20].map(cost => (
              <CitySlot key={cost} cost={cost} />
            ))}
          </div>
        </div>
      </div>
    </Movable>
  );
}
