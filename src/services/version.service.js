import { apiUrl } from "../config";

async function apiRequest(endpoint, ...rest) {
  const response = await fetch(`${apiUrl}/${endpoint}`);

  try {
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.warn("error", error);

    return Promise.reject(error);
  }
}

//api method
export function getVersion() {
  return apiRequest("version").then(data => data.version);
}

//singletone?
export const $apiVersion = getVersion();
