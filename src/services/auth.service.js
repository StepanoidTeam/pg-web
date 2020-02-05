import { apiRequest } from "./api-request";

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
  return (
    apiRequest("auth/status", {
      // todo(vmyshko): make common
      headers: {
        "Content-type": "application/json",
        authToken: AuthToken
      },
      method: "POST",
      body: JSON.stringify({
        gameRoomId: true,
        lastActivityTime: true,
        isOnline: true,
        authToken: true,
        id: true,
        name: true
      })
    })
      // todo(vmyshko): izya to fix this data.data
      .then(data => data.data)
  );
}
