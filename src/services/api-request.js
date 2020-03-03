import * as firebase from 'firebase/app';

import { apiUrl } from '../config';
import { firebaseConfig } from '../config';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const IS_LOCAL_ENV = ['192.168.', 'localhost'].some(h =>
  window.location.hostname.startsWith(h),
);

if (IS_LOCAL_ENV) {
  console.log('🏠local env detected!');
  db.settings({
    host: `${window.location.hostname}:8080`,
    ssl: false,
  });
} else {
  console.log('🌐global env used');
}

export function dbDoc(entityName, id) {
  const entityRef = db.collection(entityName).doc(id);
  const snapFn = callback => doc => callback({ id: doc.id, ...doc.data() });

  return {
    get: callback => entityRef.get().then(snapFn(callback)),
    onUpdate: callback => entityRef.onSnapshot(snapFn(callback)),
  };
}

export function dbCollection(entityName) {
  const entityRef = db.collection(entityName);
  const snapFn = callback => snap =>
    callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

  return {
    get: callback => entityRef.get().then(snapFn(callback)),
    onUpdate: callback => entityRef.onSnapshot(snapFn(callback)),
  };
}

export async function apiRequest(endpoint, options = {}) {
  const { currentUser } = await firebase.auth();

  const authToken = currentUser ? await currentUser.getIdToken(true) : '';

  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
      ...options,
    });

    if (!response.ok) {
      throw await response.json();
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.warn('api error', error);

    return Promise.reject(error);
  }
}
