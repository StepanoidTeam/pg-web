import React, { useState, useEffect } from "react";

import { useGlobal } from "../../use-global";
import { getRoomList, joinRoom } from "../../services/room.service";
import { useHistory } from "react-router-dom";

import "./rooms.css";

export default function RoomList() {
  const history = useHistory();
  const [{ authToken, rooms }, { setRooms }] = useGlobal();

  const onRoomCreate = () => {
    history.push(`/rooms/new`);
  };

  const onRoomJoin = roomId => {
    joinRoom(authToken, roomId).then(data => {
      // todo(vmyshko): get rid of # in game object ids (izya)
      history.push(`/rooms/${encodeURIComponent(roomId)}`);
    });
  };

  useEffect(() => {
    getRoomList(authToken).then(rooms => {
      setRooms(rooms);
    });
  }, []);

  return (
    <div className="rooms form flex-column p-2">
      <h1 className="m-2">rooms</h1>
      <ul className="room-list list flex-column p-1 m-2">
        {rooms
          //[...rooms, ...rooms, ...rooms]
          //.filter(r => !r.IsInGame)
          .map(room => (
            <li
              className="list-item flex-row align-center p-2 m-1"
              key={room.Id}
            >
              <span className="room-name fill-left">{room.Name}</span>

              <div className="flex-row align-center">
                <i className="material-icons">group</i>
                <span className="px-1">{room.UserCount}</span>

                <button className="button" onClick={() => onRoomJoin(room.Id)}>
                  join
                </button>
              </div>
            </li>
          ))}
      </ul>

      <button
        className="button flex-row align-center justify-center m-2"
        onClick={onRoomCreate}
      >
        <span>create new room</span>
        <i className="material-icons">add_box</i>
      </button>
    </div>
  );
}
