import React from 'react';
import globalHook from 'use-global-hook';

import CookieService from './services/cookie.service';

const initialState = {
  isOnline: false,
  apiVersion: null,
  //todo: get token from cookie?
  authToken: CookieService.get('authToken'),
  isAuthenticated: false,
  user: null,
  counter: 0,
  rooms: [],
  //game
  game: {
    GameRoomId: null,
    playerBoards: [],
  },
};

function _usePlayerBoard(store, { Id }) {
  const playerBoard = store.state.game.playerBoards.find(p => p.Id === Id);

  return [
    playerBoard,
    pb => {
      store.setState({
        game: {
          ...store.state.game,
          playerBoards: [
            ...store.state.game.playerBoards.filter(p => p.Id !== Id),
            pb,
          ],
        },
      });
    },
  ];
}

const actions = {
  //common
  setOnline(store, status = true) {
    store.setState({ isOnline: status });
  },
  setApiVersion(store, apiVersion) {
    store.setState({ apiVersion });
  },
  //debug
  addToCounter(store, value) {
    store.setState({
      counter: store.state.counter + 1,
    });
  },
  //user-data
  setUserData(store, { AuthToken: authToken, Id: id, Name: name, GameRoomId }) {
    store.setState({
      authToken,
      user: { id, name },
      isAuthenticated: true,
      game: {
        ...store.state.game,
        GameRoomId,
      },
    });

    CookieService.set('authToken', authToken);
  },
  clearUserData(store) {
    store.setState({
      authToken: null,
      user: null,
      isAuthenticated: false,
    });
    CookieService.delete('authToken');
  },
  //rooms
  setRooms(store, rooms) {
    store.setState({
      rooms,
    });
  },
  setUserJoin(store, user) {
    //{EntityType: "User", Id: "u#88173017", Name: "kekster2000"}
    //lack of:
    // {
    //       Color: 4,
    //       EntityType: 'PlayerBoard',
    //       Id: 'u#88173017',
    //       IsDone: false,
    //       Money: 0,
    //       Name: 'kekster2000',
    //     }

    const [, setPlayerBoard] = _usePlayerBoard(store, { Id: user.Id });

    const newPlayerBoard = {
      ...user,
      //defaults that izya zajopilsya prislat'
      EntityType: 'PlayerBoard',
      Color: 0,
      IsDone: false,
      Money: 0,
    };

    setPlayerBoard(newPlayerBoard);
  },
  setUserLeave(store, { Id }) {
    store.setState({
      game: {
        ...store.state.game,
        playerBoards: [
          ...store.state.game.playerBoards.filter(p => p.Id !== Id),
        ],
      },
    });
  },
  //game
  setPlayerBoards(store, playerBoards) {
    store.setState({
      game: {
        ...store.state.game,
        playerBoards,
      },
    });
  },
  setPlayerColor(store, { Id, Color }) {
    const [playerBoard, setPlayerBoard] = _usePlayerBoard(store, { Id });

    if (!playerBoard) return console.warn(`${Id} not found`);
    playerBoard.Color = Color;

    setPlayerBoard(playerBoard);
  },
  setPlayerIsDone(store, { Id, IsDone }) {
    const [playerBoard, setPlayerBoard] = _usePlayerBoard(store, { Id });
    if (!playerBoard) return console.warn(`${Id} not found`);

    playerBoard.IsDone = IsDone;

    setPlayerBoard(playerBoard);
  },
};

export const useGlobal = globalHook(React, initialState, actions);
