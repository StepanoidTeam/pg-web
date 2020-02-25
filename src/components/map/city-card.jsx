import React, { useState } from 'react';

import Movable from './movable';

import './city-card.css';
import { regions } from './mappers';

function CitySlot({ cost, onClick }) {
  return (
    <div className="city-slot m-1 text-stroke" onClick={onClick}>
      <span className="select-none">{cost}</span>
    </div>
  );
}

export default function CityCard(props) {
  const { x, y, name, region, onUpdateCity } = props;

  const [position, setPosition] = useState({ x, y });

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
                  console.log('click');
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
          <div
            className="city-slots flex-row"
            hidden
            //hidden={Math.random() * 10 > 5}
          >
            {[10, 15, 20].map(cost => (
              <CitySlot
                key={cost}
                cost={cost}
                onClick={event => {
                  event.stopPropagation();
                  console.log('click');
                  onSlotClick(cost);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Movable>
  );
}
