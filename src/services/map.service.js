import { apiRequest } from './api-request';

export function getMapList(authToken) {
  return apiRequest('maps/list', {
    // todo(vmyshko): make common
    headers: {
      'Content-type': 'application/json',
      authToken,
    },
    method: 'GET',
    //body: JSON.stringify({ username, password })
  });
}

export function getMap(authToken, mapId) {
  return apiRequest('maps/map', {
    // todo(vmyshko): make common
    headers: {
      'Content-type': 'application/json',
      authToken,
    },
    method: 'POST',
    body: JSON.stringify({ mapId }),
  });
}
