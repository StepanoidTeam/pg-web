import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGlobal } from '../../use-global';
import { getMap } from '../../services/map.service';

import './map.css';
import CityCard from './city-card';

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

  return (
    <div>
      <h1>map</h1>
      cities
      <div className="map-overlay">
        {mapData.Cities.map(c => {
          return <CityCard x={c.CoordX} y={c.CoordY} name={c.Name} />;
        })}
      </div>
    </div>
  );
}
