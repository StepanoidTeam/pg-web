import React from 'react';
import ReactDOM from 'react-dom';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

const firebaseConfig = {
  apiKey: 'AIzaSyBrLjfuTRzphTHh_9V7Aik-jTLylWfAnt0',
  authDomain: 'power-grid-c1320.firebaseapp.com',
  databaseURL: 'https://power-grid-c1320.firebaseio.com',
  projectId: 'power-grid-c1320',
  storageBucket: 'power-grid-c1320.appspot.com',
  messagingSenderId: '458551111011',
  appId: '1:458551111011:web:58bbe6f37b886a81c73756',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
