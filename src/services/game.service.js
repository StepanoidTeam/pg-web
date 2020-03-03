import { apiRequest } from './api-request';

export function getGameStatus() {
  return apiRequest('game/status', {
    method: 'GET',
  });
}

export function changeColor(userId) {
  return apiRequest('game/changeColor', {
    method: 'POST',
    body: JSON.stringify({ userId }),
  });
}

export function toggleReady(state = true) {
  return apiRequest('game/toggleReady', {
    method: 'POST',
    body: JSON.stringify({ state }),
  });
}
