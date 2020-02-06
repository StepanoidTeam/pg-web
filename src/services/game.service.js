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
