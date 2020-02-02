import { apiRequest } from "./api-request";

//helper
//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//api method
export async function getVersion() {
  //await sleep(3000);
  return apiRequest("version").then(data => data.version);
}

//singletone?
export const $apiVersion = getVersion();
