import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SignIn from "./components/signIn";
import * as firebase from "firebase";
const dotenv = require("dotenv");

dotenv.config();

// const config = {
//   apiKey: process.env.API_KEY,
//   authDomain: API_DOMAIN,
//   databaseURL: "https://famda-74c6e.firebaseio.com",
//   projectId: "famda-74c6e",
//   storageBucket: "famda-74c6e.appspot.com",
//   messagingSenderId: "942608391368"
// };
const config = {
  apiKey: "AIzaSyCohel0hmHhoTS_pYeY97oJVPX-PVxJZ34",
  authDomain: "famda-74c6e.firebaseapp.com",
  databaseURL: "https://famda-74c6e.firebaseio.com",
  projectId: "famda-74c6e",
  storageBucket: "famda-74c6e.appspot.com",
  messagingSenderId: "942608391368"
};

firebase.initializeApp(config);
// const db = firebase.firestore();

// logout
// firebase
//   .auth()
//   .signOut()
//   .then(function() {
//     console.log("done");
//   })
//   .catch(function(error) {
//     // An error happened.
//   });

// sign in
// firebase
//   .auth()
//   .signInWithEmailAndPassword("jochemvandervalk@gmail.com", "Jv@270402")
//   .catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });

// let user = firebase.auth().currentUser;
// console.log(user);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
