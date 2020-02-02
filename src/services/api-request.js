import { apiUrl } from "../config";

export async function apiRequest(endpoint, ...rest) {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, ...rest);
    if (!response.ok) throw response.statusText;

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.warn("error", error);

    return Promise.reject(error);
  }
}
