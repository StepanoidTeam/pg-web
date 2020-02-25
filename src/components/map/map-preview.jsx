import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { kebabCase } from 'lodash';

import { useGlobal } from '../../use-global';
import { getMap } from '../../services/map.service';
import CityCard from './city-card';
import wiresSvg from '../../assets/wires-20.svg';
import WiredConnection from './wired-connection';
import initZoom from './zoom';

import './map.css';
import { mapCity, mapConnector, regions } from './mappers';
import Movable from './movable';

import africaMap from './africa.map.json';

// todo(vmyshko): force izya to update all namings to lowecase etc.

export default function MapPreview() {
  const { mapId } = useParams();
  const [
    { authToken, connectors, cities },
    { setConnectors, setCities },
  ] = useGlobal();

  const [toolCursorPos, setToolCursorPos] = useState({ x: 0, y: 0 });
  const [toolCursorIsMoving, setToolCursorIsMoving] = useState(false);

  useEffect(() => {
    const mapData = africaMap;

    console.log('🗾', mapData);
    window.mapData = mapData;

    const { cities, connectors } = mapData;

    setCities(cities);
    setConnectors(connectors);

    initZoom();
  }, []);

  const getRandomId = () =>
    Date.now()
      .toString()
      .substr(-6);

  function addCity(props) {
    const { x, y, name = '' } = props;

    const cityName = name || prompt('enter name', `city ${getRandomId()}`);

    if (!cityName) return;

    const newCity = {
      id: kebabCase(cityName),
      x,
      y,
      name: cityName,
      region: regions[0],
    };

    setCities([...cities, newCity]);
  }

  function addConnector() {
    const [_from, _to] = cities.reverse();

    if (!_from || !_to) {
      console.log('no cities');
      return;
    }

    const from = prompt('from', _from.id);
    const to = prompt('to', _to.id);
    const cost = +prompt('cost', 10);

    if (!from || !to || !isFinite(cost)) return;

    if (!cities.some(c => [from, to].includes(c.id))) return;

    const newConnector = {
      id: `conn-${getRandomId()}`,
      from,
      to,
      cost,
    };

    setConnectors([...connectors, newConnector]);
  }

  function saveMap() {
    const map = { connectors, cities };

    localStorage.setItem('map', JSON.stringify(map));
    console.log('map saved to ls');
  }

  function loadMap() {
    const mapJson = localStorage.getItem('map');

    if (!mapJson) {
      console.log('map not found');
      return;
    }

    const { connectors, cities } = JSON.parse(mapJson);

    setCities(cities);
    setConnectors(connectors);

    console.log('map loaded');
  }

  function clearMap() {
    setCities([]);
    setConnectors([]);

    console.log('map cleared');
  }

  const updateCity = ({ id, ...props }) => {
    const oldCity = cities.find(c => c.id === id);

    // console.log(props);

    const city = { ...oldCity, ...props };

    // console.log('city update', props, city.name);
    if (!city.name || city.name.length === 0) {
      console.log('city delete');
      //delete
      deleteConnectors(city.id);
      setCities(cities.filter(c => c.id !== id));
    } else {
      //update

      setCities([...cities.filter(c => c.id !== id), city]);

      setConnectors(connectors);
    }
  };

  const deleteConnectors = cityId => {
    setConnectors(connectors.filter(c => ![c.from, c.to].includes(cityId)));
  };

  const updateConnector = ({ id, ...props }) => {
    const oldConnector = connectors.find(c => c.id === id);
    const connector = { ...oldConnector, ...props };

    if (!isFinite(connector.cost)) {
      //delete
      setConnectors(connectors.filter(c => c.id !== id));
    } else {
      // update
      setConnectors([...connectors.filter(c => c.id !== id), connector]);
    }
  };

  const mapSize = {
    width: 3500,
    height: 2400,
  };

  return (
    <div>
      <div className="map-overlay">
        <div className="map-content map-bg" style={mapSize}>
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
              const from = cities.find(city => city.id === conn.from);
              const to = cities.find(city => city.id === conn.to);

              return (
                <WiredConnection
                  key={conn.id}
                  from={from}
                  to={to}
                  cost={conn.cost}
                  onUpdateConnector={props =>
                    updateConnector({ id: conn.id, ...props })
                  }
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
                key={city.id}
                x={city.x}
                y={city.y}
                name={city.name}
                region={city.region}
                onUpdateCity={props => updateCity({ id: city.id, ...props })}
              />
            );
          })}

          <div
            className="overlay flex-row center-center"
            hidden={!toolCursorIsMoving}
            style={{
              left: toolCursorPos.x,
              top: toolCursorPos.y,
            }}
          >
            <div className="tool-cursor overlay">add here</div>
          </div>
        </div>
      </div>

      <div className="map-tools overlay flex-row z-index-1 p-2">
        <button className="p-2 ml-2" onClick={loadMap}>
          load map
        </button>
        <button className="p-2 ml-2" onClick={saveMap}>
          save map
        </button>
        <button className="p-2 ml-2" onClick={clearMap}>
          clear map
        </button>

        <button className="p-2 ml-2" onClick={addConnector}>
          add connector
        </button>

        <Movable
          onStart={({ x, y }) => {}}
          onDrag={pos => {
            setToolCursorPos(pos);
            setToolCursorIsMoving(true);
          }}
          onDrop={pos => {
            addCity({
              ...pos,
            });

            setToolCursorPos({ x: 0, y: 0 });
            setToolCursorIsMoving(false);
          }}
        >
          <button className="p-2 ml-2">add city</button>
        </Movable>
      </div>
    </div>
  );
}
