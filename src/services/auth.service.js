import { apiRequest } from "./api-request";

//helper
//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function logIn({ username, password }) {
  return apiRequest("auth/login", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ username, password })
  });
}

export function register({ username, password }) {
  return apiRequest("auth/register", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ username, password })
  });
}

export function getStatus(AuthToken) {
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
