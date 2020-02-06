import { apiRequest } from "./api-request";

export function getRoomList(authToken) {
  return apiRequest("room/list", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json",
      authToken
    },
    method: "GET"
    //body: JSON.stringify({ username, password })
  });
}

export function joinRoom(authToken, roomId) {
  return apiRequest("room/join", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json",
      authToken
    },
    method: "POST",
    body: JSON.stringify({ roomId })
  });
}

export function leaveRoom(authToken) {
  return apiRequest("room/leave", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json",
      authToken
    },
    method: "POST"
    //body: JSON.stringify({ roomId })
  });
}
