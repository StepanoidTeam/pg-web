import { apiRequest } from "./api-request";

export async function getApiVersion() {
  return apiRequest("version").then(data => data.version);
}
