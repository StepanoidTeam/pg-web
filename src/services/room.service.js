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
