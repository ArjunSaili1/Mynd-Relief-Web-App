import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'
import 'firebase/auth'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import Dashboard from './dashboard/dashboard';
import Mainpage from './mainpage/mainpage';
 
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDsyfxYvCYQLAOcUVYKE6d7WEHCHhotClI",
  authDomain: "mynd-relief-firebase.firebaseapp.com",
  databaserURL: "https://mynd-relief-firebase-default-rtdb.firebaseio.com/",
  projectId: "mynd-relief-firebase",
  storageBucket: "mynd-relief-firebase.appspot.com",
  messagingSenderId: "422247312528",
  appId: "1:422247312528:web:8f0e6843e5bf298ac97c15",
});

const routing = (
  <Router>
    <div id='routing-container'>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={Dashboard}></Route>
      <Route path='/mainpage' component={Mainpage}></Route>
    </div>
  </Router>
)
ReactDOM.render(
    routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
