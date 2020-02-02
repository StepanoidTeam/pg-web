import { apiUrl } from "../config";
import { wait } from "@testing-library/react";

async function apiRequest(endpoint, ...rest) {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    if (!response.ok) throw response.statusText;

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.warn("error", error);

    return Promise.reject(error);
  }
}

//helper
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//api method
export async function getVersion() {
  //await sleep(3000);
  return apiRequest("version").then(data => data.version);
}

//singletone?
export const $apiVersion = getVersion();
