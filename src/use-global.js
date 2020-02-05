import React from "react";
import globalHook from "use-global-hook";

import CookieService from "./services/cookie.service";

const initialState = {
  isOnline: false,
  //todo: get token from cookie?
  authToken: CookieService.get("authToken"),
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
  setUserData(store, { AuthToken: authToken, Id: id, Name: name }) {
    store.setState({
      authToken,
      user: { id, name },
      isAuthenticated: true
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
  }
  //
};

export const useGlobal = globalHook(React, initialState, actions);
