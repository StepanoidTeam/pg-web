import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGameStatus } from "../../services/game.service";
import { useGlobal } from "../../use-global";

const colors = [
  "red",
  "green",
  "yellow",
  "blue"
  //...
];

export default function CurrentRoom() {
  const { _roomId } = useParams();
  const roomId = decodeURIComponent(_roomId);

  const [{ authToken, rooms, game }, { setPlayerBoards }] = useGlobal();
  const { playerBoards } = game;

  useEffect(() => {
    getGameStatus(authToken).then(data => {
      setPlayerBoards(data.PlayerBoards);
    });
  }, []);

  const currentRoom = rooms.find(r => r.Id === roomId);

  if (!currentRoom) return null;

  const onLeave = () => {};
  const onChangeColor = () => {};
  const onToggleReady = () => {};
  const onGameStart = () => {};
  const onAddBot = () => {};
  const onKick = () => {};

  return (
    <div className="form flex-column p-2">
      <h1 className="flex-row m-2">
        <span className="fill-left">{currentRoom.Name}</span>

        <div className="flex-row align-center">
          <i className="material-icons">group</i>
          <span className="px-1">{currentRoom.UserCount}</span>
        </div>
      </h1>

      <ul className="player-list list flex-column p-1 m-2">
        {playerBoards.map(board => (
          <li
            className="list-item flex-row align-center p-2 m-1"
            key={board.Id}
          >
            <div className="player-name fill-left">
              <span onClick={onChangeColor}>{board.Color}</span>
              <span>{board.Name}</span>
            </div>
            <i className="material-icons" onClick={onToggleReady}>
              {board.IsDone ? "thumb_up" : "thumb_down"}
            </i>
          </li>
        ))}
      </ul>
      <div className="flex-row align-center">
        <button className="button mx-1">leave</button>
        <div className="fill-left"></div>
        <button className="button mx-1">add bot</button>
        <button className="button mx-1">start game</button>
      </div>
    </div>
  );
}

// PlayerBoards: [
//   {
//     EntityType: "PlayerBoard",
//     Id: "u#890a5bf3",
//     Name: "Max",
//     Color: 0,
//     Money: 0,
//     IsDone: false
//   },
//   {
//     EntityType: "PlayerBoard",
//     Id: "u#88173017",
//     Name: "kekster2000",
//     Color: 7,
//     Money: 0,
//     IsDone: false
//   }
// ];
