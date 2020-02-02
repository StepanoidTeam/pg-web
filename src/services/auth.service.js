import { apiRequest } from "./api-request";

//helper
//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const authState = {
  AuthToken: null,
  isAuthenticated: false
};

function storeUserAuth({ AuthToken }) {
  authState.AuthToken = AuthToken;
  authState.isAuthenticated = true;
  document.cookie = `AuthToken=${AuthToken}`;
}

function clearUserAuth() {
  authState.AuthToken = null;
  authState.isAuthenticated = false;
  document.cookie = `AuthToken=`;
}

export function logIn({ username, password }) {
  return apiRequest("auth/login", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ username, password })
  })
    .then(data => {
      storeUserAuth(data);

      return data;
    })
    .catch(error => {
      throw error;
    });
}

function getStatus() {
  const { AuthToken } = authState;
  return apiRequest("auth/status", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ AuthToken })
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}
