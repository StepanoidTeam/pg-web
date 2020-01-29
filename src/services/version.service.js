const apiUrl = "https://pg-api.azurewebsites.net/api/";

export async function getVersion() {
  return fetch(`${apiUrl}/version`)
    .then(data => data.json())
    .then(data => data.data.version);
}
