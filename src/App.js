import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Components/Layout/header";
import User from "./Components/user";
import Routes from "./Routes";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import {loadUser} from './Utils/dbUtils'

const firebaseConfig = {
  apiKey: "AIzaSyDex00A5l25hIjVvdApM1nEYVnHiqnEBa8",
  authDomain: "chatapp-245f1.firebaseapp.com",
  databaseURL: "https://chatapp-245f1.firebaseio.com",
  projectId: "chatapp-245f1",
  storageBucket: "chatapp-245f1.appspot.com",
  messagingSenderId: "795579735525",
  appId: "1:795579735525:web:79499e7e7cb77c1bdea30c",
  measurementId: "G-EMF4PKP6H9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  const onLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      if (response) {
        //Para leer los datos del usuario Logeado
        loadUser(response.uid)
        .then(data => {setUser(data);});
      }
    });
  }, []);
  return (
    <Router>
      <CssBaseline />
      <Header>{user && <User user={user} onLogout={onLogout} />}</Header>
      <Routes />
    </Router>
  );
}

export default App;
