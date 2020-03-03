import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { sortBy } from 'lodash';

import { changeColor, toggleReady } from '../../services/game.service';
import {
  leaveRoom,
  kickPlayer,
  roomDoc,
  playersList,
} from '../../services/room.service';

export default function CurrentRoom() {
  const { _roomId } = useParams();
  const history = useHistory();

  const [currentRoom, setCurrentRoom] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    roomDoc(_roomId).onUpdate(setCurrentRoom);
    // todo(vmyshko): where to get colors etc?
    playersList(_roomId).onUpdate(setPlayers);
  }, []);

  if (!currentRoom) return null;

  const onLeave = () => {
    leaveRoom().then(() => {
      history.push('/rooms');
    });
  };

  const onChangeColor = userId => {
    //change for yourself or for another if admin?
    //seems it always change mine, no matter what userid was sent
    changeColor(userId).then(() => {
      //refresh
    });
  };
  const onToggleReady = (userId, isReady = true) => {
    //todo: just check for current
    //todo:save current state and toggle on/off
    toggleReady(isReady).then(() => {
      //refresh?
    });
  };
  const onGameStart = () => {};
  const onAddBot = () => {};
  const onKick = playerId => {
    kickPlayer(playerId).then(() => {
      //refresh?
    });
  };

  const boardsSorted = sortBy(players, 'id');
  console.log(currentRoom, players);

  const allReady = boardsSorted.every(b => b.IsDone);

  return (
    <div className="form flex-column p-2">
      <h1 className="flex-row mx-2">
        <span className="fill-left">{currentRoom.name}</span>

        <div className="flex-row align-center">
          <i className="material-icons">group</i>
          <span className="px-1">{currentRoom.playerCount}</span>
        </div>
      </h1>

      <ul className="player-list list flex-column p-1 m-2">
        {boardsSorted.map(board => (
          <li
            className="list-item flex-row align-center p-2 m-1"
            key={board.Id}
          >
            <div className="player-name flex-row fill-left align-center">
              <i
                className={`city-icon color-${board.Color} cursor-pointer`}
                onClick={() => onChangeColor(board.Id)}
              />
              <span className="px-2">{board.Name}</span>
            </div>

            <i
              className="material-icons cursor-pointer mx-2"
              onClick={() => onKick(board.Name)} // todo(vmyshko): change to id, after api update
            >
              delete
            </i>
            <i
              className="material-icons cursor-pointer mx-1"
              style={{
                color: board.IsDone ? 'gold' : 'gray',
              }}
              onClick={() => onToggleReady(board.Id, !board.IsDone)}
            >
              {board.IsDone ? 'thumb_up' : 'thumb_down'}
            </i>
          </li>
        ))}
      </ul>
      <div className="flex-row align-center">
        <button className="button mx-1" onClick={onLeave}>
          leave
        </button>
        <div className="fill-left"></div>
        <button className="button mx-1" onClick={onAddBot}>
          add bot
        </button>
        <button
          className={'button mx-1'}
          disabled={!allReady}
          onClick={onGameStart}
        >
          start game
        </button>
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
