import React from "react";
import globalHook from "use-global-hook";

import CookieService from "./services/cookie.service";

const initialState = {
  isOnline: false,
  apiVersion: null,
  //todo: get token from cookie?
  authToken: CookieService.get("authToken"),
  isAuthenticated: false,
  user: null,
  counter: 0,
  rooms: [],
  //game
  game: {
    GameRoomId: null,
    playerBoards: []
  }
};

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
      counter: store.state.counter + 1
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
        GameRoomId
      }
    });

    CookieService.set("authToken", authToken);
  },
  clearUserData(store) {
    store.setState({
      authToken: null,
      user: null,
      isAuthenticated: false
    });
    CookieService.delete("authToken");
  },
  //rooms
  setRooms(store, rooms) {
    store.setState({
      rooms
    });
  },
  // {
  //   "EntityType": "GameRoom",
  //   "Id": "r#789da1e8",
  //   "Name": "Austria 2017",
  //   "IsInGame": false,
  //   "UserCount": 2
  // },
  //game
  setPlayerBoards(store, playerBoards) {
    store.setState({
      game: {
        ...store.state.game,
        playerBoards
      }
    });
  }
};

export const useGlobal = globalHook(React, initialState, actions);
