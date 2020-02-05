import React from "react";
import globalHook from "use-global-hook";

import CookieService from "./services/cookie.service";

const initialState = {
  isOnline: false,
  //todo: get token from cookie?
  AuthToken: CookieService.get("authToken"),
  isAuthenticated: false,
  user: null,
  counter: 0
};

const actions = {
  //online
  setOnline(store, status = true) {
    store.setState({ isOnline: status });
  },
  //debug
  addToCounter(store, value) {
    store.setState({
      counter: store.state.counter + 1
    });
  },
  //user-data
  setUserData(store, { AuthToken, Id, Name }) {
    store.setState({
      AuthToken,
      user: { Id, Name },
      isAuthenticated: true
    });
    CookieService.set("authToken", AuthToken);
  },
  clearUserData(store) {
    store.setState({
      AuthToken: null,
      user: null,
      isAuthenticated: false
    });
    CookieService.delete("authToken");
  }
  //
};

export const useGlobal = globalHook(React, initialState, actions);
