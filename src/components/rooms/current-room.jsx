import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { sortBy } from 'lodash';

import {
  getGameStatus,
  changeColor,
  toggleReady,
} from '../../services/game.service';
import { useGlobal } from '../../use-global';
import { leaveRoom } from '../../services/room.service';

export default function CurrentRoom() {
  const { _roomId } = useParams();
  const history = useHistory();
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

  const onLeave = () => {
    leaveRoom(authToken).then(() => {
      history.push('/rooms');
    });
  };

  const onChangeColor = userId => {
    //change for yourself or for another if admin?
    //seems it always change mine, no matter what userid was sent
    changeColor(authToken, userId).then(() => {
      //refresh
    });
  };
  const onToggleReady = userId => {
    //todo: just check for current
    //todo:save current state and toggle on/off
    toggleReady(authToken, true).then(() => {
      //refresh
    });
  };
  const onGameStart = () => {};
  const onAddBot = () => {};
  const onKick = playerId => {};

  const boardsSorted = sortBy(playerBoards, 'Id');

  return (
    <div className="form flex-column p-2">
      <h1 className="flex-row m-2">
        <span className="fill-left">{currentRoom.Name}</span>

        <div className="flex-row align-center">
          <i className="material-icons">group</i>
          <span className="px-1">{boardsSorted.length}</span>
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
              onClick={() => onKick(board.Id)}
            >
              delete
            </i>
            <i
              className="material-icons cursor-pointer mx-1"
              onClick={() => onToggleReady(board.Id)}
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
        <button className="button mx-1" onClick={onGameStart}>
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
