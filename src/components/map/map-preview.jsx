import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGlobal } from '../../use-global';
import { getMap } from '../../services/map.service';
import CityCard from './city-card';
import wiresSvg from '../../assets/wires-20.svg';
import WiredConnection from './wired-connection';
import initZoom from './zoom';

import './map.css';
import { modificator, mapCity, mapConnector, regions } from './mappers';

// todo(vmyshko): force izya to update all namings to lowecase etc.

export default function MapPreview() {
  const { mapId } = useParams();
  const [
    { authToken, connectors, cities },
    { setConnectors, setCities },
  ] = useGlobal();

  useEffect(() => {
    getMap(authToken, mapId).then(mapData => {
      console.log('🗾', mapData);
      window.mapData = mapData;

      const cities = mapData.Cities.map(mapCity);
      const connections = mapData.Connectors.map(mapConnector);

      console.log(cities, connections);
      //empty map
      setCities([], cities);
      setConnectors([], connections);

      initZoom();
    });
  }, []);

  function addCity() {
    const id = Date.now()
      .toString()
      .substr(-4);
    const newCity = {
      id,
      x: 400,
      y: 400,
      name: prompt('enter name', `city ${id.substr(-4)}`),
      region: regions[0],
    };

    setCities([...cities, newCity]);
  }

  function addConnector() {
    const [from, to] = cities;

    if (!from || !to) {
      console.log('no cities');
      return;
    }

    const newConnector = {
      id: Date.now(),

      from: prompt('from', from.id),
      to: prompt('to', to.id),
      cost: prompt('cost', 10),
    };

    setConnectors([...connectors, newConnector]);
  }

  const updateCity = ({ id, ...props }) => {
    const oldCity = cities.find(c => c.id === id);

    // console.log(props);

    const city = { ...oldCity, ...props };

    console.log('city update', props, city.name);
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
    width: 1650 * modificator.x,
    height: 950 * modificator.y,
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
        </div>
      </div>

      <div className="map-tools overlay flex-row z-index-1 p-2">
        <button className="p-2" onClick={addCity}>
          add city
        </button>
        <button className="p-2 mx-2" onClick={addConnector}>
          add connector
        </button>
      </div>
    </div>
  );
}
