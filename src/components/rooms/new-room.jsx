import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createRoom } from '../../services/room.service';
import { getMapList } from '../../services/map.service';
import { useGlobal } from '../../use-global';

export default function NewRoom() {
  const [mapList, setMapList] = useState([]);
  const history = useHistory();

  const [{ authToken }, {}] = useGlobal();

  useEffect(() => {
    getMapList().then(maps => {
      setMapList(maps);
    });
  }, []);

  const onCreateRoom = () => {
    createRoom(authToken).then(() => {
      //navigate?
    });
  };

  const onPreviewMap = mapId => {
    history.push(`/maps/${mapId}`);
  };

  return (
    <div className="form flex-column p-2">
      <h1 className="flex-row mx-2">
        <span className="fill-left">select map</span>
      </h1>

      <ul className="map-list list flex-column p-1 m-2" style={{ width: 320 }}>
        {mapList.map(map => (
          <li className="list-item flex-row align-center p-2 m-1" key={map}>
            <span className="fill-left">{map}</span>
            <button className="button" onClick={() => onPreviewMap(map)}>
              preview
            </button>
          </li>
        ))}
      </ul>

      <div className="flex-row align-center">
        <Link to="/rooms">
          <button className="button mx-1">quit</button>
        </Link>
        <div className="fill-left"></div>

        <button className="button mx-1" onClick={onCreateRoom}>
          create room
        </button>
      </div>
    </div>
  );
}
