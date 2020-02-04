import React from "react";
import globalHook from "use-global-hook";

const initialState = {
  isOnline: false,
  //todo: get token from cookie?
  AuthToken: null,
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
  },
  clearUserData(store) {
    store.setState({
      AuthToken: null,
      user: null,
      isAuthenticated: false
    });
  }
  //
};

export const useGlobal = globalHook(React, initialState, actions);
