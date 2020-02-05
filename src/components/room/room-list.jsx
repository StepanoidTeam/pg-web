import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import Input from "../common/input";
import { logIn } from "../../services/auth.service";
import { useGlobal } from "../../use-global";
import { getRoomList } from "../../services/room.service";

export default function RoomList() {
  const [{ AuthToken }, {}] = useGlobal();

  const [rooms, setRooms] = useState([]);

  const history = useHistory();
  const location = useLocation();

  const onRoomCreate = () => {
    console.log("not impl");
  };
  const onRoomJoin = () => {};

  useEffect(() => {
    getRoomList(AuthToken).then(rooms => {
      setRooms(rooms);
    });
  }, []);

  return (
    <div className="form flex-column">
      <ul className="flex-column p-4">
        {rooms.map(room => (
          <li className="flex-row m-2" key={room.Id}>
            <span>{room.Name}</span>
            <span>status:{room.IsInGame}</span>
            <span>plrs:{room.UserCount}</span>
          </li>
        ))}
      </ul>

      <button
        className="button flex-row align-center justify-center"
        onClick={onRoomCreate}
      >
        <span>create new room</span>
        <i className="material-icons">add_box</i>
      </button>
    </div>
  );
}
