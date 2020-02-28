import * as firebase from 'firebase/app';

import { apiRequest } from './api-request';

export function logIn({ username, password }) {
  return firebase.auth().signInWithEmailAndPassword(username, password);
}

export function register({ username, password }) {
  return firebase.auth().createUserWithEmailAndPassword(username, password);
}

export function logOut() {
  return firebase.auth().signOut();
}

export function getStatus(authToken) {
  return firebase.auth().currentUser;
}
