import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createRoom } from '../../services/room.service';
import { mapList } from '../../services/map.service';

export default function NewRoom() {
  const [maps, setMaps] = useState([]);
  const history = useHistory();

  useEffect(() => {
    mapList().get(maps => {
      console.log(maps);
      setMaps(maps);
    });
  }, []);

  const onCreateRoom = () => {
    createRoom({
      name: 'new room name here',
      maxPlayers: 10,
      map: 'africa',
    }).then(() => {
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
        {maps.map(map => (
          <li
            className="list-item flex-row align-center p-2 m-1"
            key={map.name}
          >
            <span className="fill-left">{map.name}</span>
            <button className="button" onClick={() => onPreviewMap(map.name)}>
              preview
            </button>
          </li>
        ))}
      </ul>

      <div className="flex-row align-center">
        <Link to="/rooms">
          <button className="button mx-1">back</button>
        </Link>
        <div className="fill-left"></div>

        <button className="button mx-1" onClick={onCreateRoom}>
          create room
        </button>
      </div>
    </div>
  );
}
