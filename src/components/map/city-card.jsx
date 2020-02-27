import React, { useState } from 'react';

import Movable from './movable';

import './city-card.css';
import { regions } from './mappers';
import { city1row_co, city2row_co } from './city-connector-offsets';

function CitySlot({ cost, onClick }) {
  return (
    <div className="city-slot m-1 text-stroke" onClick={onClick}>
      <span className="select-none">{cost}</span>
    </div>
  );
}

export default function CityCard(props) {
  const { x, y, name, region, isCapital = false, onUpdateCity } = props;

  const [position, setPosition] = useState({ x, y });

  const debugPoints = (isCapital ? city2row_co : city1row_co).map(
    ({ x, y }, index) => (
      <div
        key={index}
        className="overlay flex-row center-center"
        style={{ left: x, top: y }}
      >
        <div className="overlay debug-point">{index}</div>
      </div>
    ),
  );

  const changeCityName = () => {
    const cityName = prompt('set city name', name);
    if (!cityName || cityName === name) return;

    //setCityName(name);
    onUpdateCity({ name: cityName });
  };

  const onSlotClick = cost => {
    const getNextRegion = item => {
      const i = regions.indexOf(item) + 1;
      const n = regions.length;

      return regions[((i % n) + n) % n];
    };

    switch (cost) {
      case 10: {
        onUpdateCity({ region: getNextRegion(region) });
        break;
      }
      case 15: {
        break;
      }
      case 20: {
        onUpdateCity({ isCapital: !isCapital });

        break;
      }
    }
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
        onUpdateCity({ ...pos });
      }}
    >
      <div className="city-card">
        <div className="city-rows flex-column p-1">
          <div className="city-slots flex-row">
            {[10, 15, 20].map(cost => (
              <CitySlot
                key={cost}
                cost={cost}
                onClick={event => {
                  event.stopPropagation();
                  onSlotClick(cost);
                }}
              />
            ))}
          </div>
          <div className="position-relative">
            <div className="overlay w-100 h-100 flex-row center-center">
              <div
                className={`city-name region-${region} px-1 text-stroke select-none`}
                onClick={changeCityName}
              >
                {name}
              </div>
            </div>
          </div>
          <div className="city-slots flex-row" hidden={!isCapital}>
            {[10, 15, 20].map(cost => (
              <CitySlot
                key={cost}
                cost={cost}
                onClick={event => {
                  event.stopPropagation();
                  onSlotClick(cost);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {window.debug && debugPoints}
    </Movable>
  );
}
