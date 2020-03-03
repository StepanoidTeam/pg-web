import { apiRequest, dbCollection } from './api-request';

export function mapList() {
  return dbCollection('maps');
}

export function getMap(mapId) {
  return apiRequest('maps/map', {
    method: 'POST',
    body: JSON.stringify({ mapId }),
  });
}
