import { apiRequest, dbCollection, dbDoc } from './api-request';

export function roomList() {
  return dbCollection('rooms');
}

export function roomDoc(roomId) {
  return dbDoc('rooms', roomId);
}

export function playersList(roomId) {
  return dbCollection(`room/${roomId}/players`);
}

export function joinRoom(roomId) {
  return apiRequest('room/join', {
    method: 'POST',
    body: JSON.stringify({ roomId }),
  });
}

export function leaveRoom() {
  return apiRequest('room/leave', {
    method: 'POST',
  });
}

export function kickPlayer(playerId) {
  // todo(vmyshko): izya pes, we need common approach here - just body param, not url
  return apiRequest(`room/kick?username=${playerId}`, {
    method: 'POST',
    body: JSON.stringify({ username: playerId }),
  });
}
export function createRoom(roomConfig) {
  return apiRequest('room/create', {
    method: 'POST',
    body: JSON.stringify(roomConfig),
  });
}
