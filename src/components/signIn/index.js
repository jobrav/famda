import React from "react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import "./style.css";
import { ReactComponent as GoogleLogo } from "./GoogleLogo.svg";

const loginWithEmail = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ...
    });
};

const loginWithGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const SignIn = props => {
  return (
    <div className="backgroud">
      <div className="headTitle">Welkom</div>
      <div className="form">
        <div className="other">
          <div className="btn" onClick={loginWithGoogle}>
            <GoogleLogo className="img"></GoogleLogo>
          </div>
        </div>
        <input
          type="email"
          id="email"
          className="input"
          placeholder="erik@gmail.com"
        />
        <input
          type="password"
          id="password"
          className="input"
          placeholder="wachtwoord"
        />
      </div>
      <div className="applyBar">
        <input
          type="submit"
          onClick={loginWithEmail}
          name="submit"
          className="bigColorBtn"
        />
        <Link style={{ all: "unset" }} to="/setup">
          <input
            type="button"
            className="bigTransBtn"
            value="Maak account aan"
          />
        </Link>
      </div>
    </div>
  );
};
export default SignIn;
