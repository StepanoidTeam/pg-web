import { apiRequest } from "./api-request";

export function getGameStatus(authToken) {
  return apiRequest("game/status", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json",
      authToken
    },
    method: "GET"
    //body: JSON.stringify({ roomId })
  });
}

export function changeColor(authToken, userId) {
  return apiRequest("game/changeColor", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json",
      authToken
    },
    method: "POST",
    body: JSON.stringify({ userId })
  });
}

export function toggleReady(authToken, state = true) {
  return apiRequest("game/toggleReady", {
    // todo(vmyshko): make common
    headers: {
      "Content-type": "application/json",
      authToken
    },
    method: "POST",
    body: JSON.stringify({ state })
  });
}
