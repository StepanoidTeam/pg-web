import React, { useEffect } from 'react';

import { roomList, joinRoom } from '../../services/room.service';
import { useHistory } from 'react-router-dom';

import './rooms.css';
import { useState } from 'react';

export default function RoomList() {
  const history = useHistory();
  const [rooms, setRooms] = useState([]);

  const onRoomCreate = () => {
    history.push(`/rooms/new`);
  };

  const onRoomJoin = roomId => {
    joinRoom(roomId).then(data => {
      history.push(`/rooms/${roomId}`);
    });
  };

  useEffect(() => {
    return roomList().onUpdate(rooms => {
      console.log(rooms);
      setRooms(rooms);
    });
  }, []);

  return (
    <div className="rooms form flex-column p-2">
      <h1 className="mx-2">rooms</h1>

      <ul className="room-list list flex-column p-1 m-2">
        {rooms.length === 0 && <li>no open rooms, but you can create one</li>}

        {rooms.map(room => (
          <li className="list-item flex-row align-center p-2 m-1" key={room.id}>
            <span className="room-name fill-left">{room.name}</span>

            <div className="flex-row align-center">
              <i className="material-icons">group</i>
              <span className="px-1">{room.playerCount}</span>

              <button className="button" onClick={() => onRoomJoin(room.id)}>
                join
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="button flex-row center-center m-2"
        onClick={onRoomCreate}
      >
        <span>create new room</span>
        <i className="material-icons">add_box</i>
      </button>
    </div>
  );
}
