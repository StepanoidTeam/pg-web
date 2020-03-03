export const wsUrl = 'wss://pg-api.azurewebsites.net/api';

export const firebaseConfig = {
  apiKey: 'AIzaSyBrLjfuTRzphTHh_9V7Aik-jTLylWfAnt0',
  authDomain: 'power-grid-c1320.firebaseapp.com',
  projectId: 'power-grid-c1320',

  functions: 'https://us-central1-power-grid-c1320.cloudfunctions.net/',
  functionsLocal: `http://localhost:5001/power-grid-c1320/us-central1/`,
};
// todo(vmyshko): impl dynamic url
//${window.location.origin}
// export const apiUrl = 'https://pg-api.azurewebsites.net/api';
export const apiUrl = firebaseConfig.functionsLocal + 'api';
