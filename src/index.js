import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDTfe7PLw4bETYBj-kXc09gOnVSBaXz0Ho",
    authDomain: "lab8dcw.firebaseapp.com",
    databaseURL: "https://lab8dcw.firebaseio.com",
    projectId: "lab8dcw",
    storageBucket: "lab8dcw.appspot.com",
    messagingSenderId: "799168006340",
    appId: "1:799168006340:web:df171f9abbfc984f2c2191",
    measurementId: "G-WM6TN1NZHV"
};

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()

ReactDOM.render(
    <App />
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
