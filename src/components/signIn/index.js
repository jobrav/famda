import React, { useState } from "react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import "./style.css";
import styled from "styled-components";
import { ReactComponent as GoogleLogo } from "./GoogleLogo.svg";



const loginWithGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const Input = styled.input`
all: unset;
width: calc(100% - 10px);
padding-left: 10px;
height: 45px;
border: ${props => props.error ? "#f52314" : "#efefef"} 2.5px solid;
grid-row: 1;
justify-self: center;
align-self: center;
margin: 5px 0;
border-radius: 6px;

&:focus {
border: rgb(0, 122, 255) 2.5px solid;
}
&:nth-of-type(2) {
grid-row: 2;
}
`
const Submit = styled.input`
all: unset;
width: calc(100% - 10px);
height: 45px;
// border: ${props => props.error ? "#f52314" : "#efefef"} 2.5px solid;
grid-row: 1;
justify-self: center;
align-self: center;
margin: 5px 0;
text-align:center;
cursor:pointer;
color:#fff;
background: ${props => props.theme.menuIC}
border-radius: 6px;

`

const SignIn = props => {
  const [error, setError] = useState(false);

  const loginWithEmail = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(true);
        console.log(errorCode, errorMessage);
        // ...
      });
  };
  return (
    <div className="backgroud app">
      <div className="headTitle">Welkom</div>
      <div className="form">
        <div className="other">
          <div className="btn" onClick={loginWithGoogle}>
            <GoogleLogo className="img"></GoogleLogo>
          </div>
        </div>
        <Input
          type="email"
          error={error}
          id="email"
          placeholder="erik@gmail.com"
        />
        <Input
          type="password"
          error={error}
          id="password"
          placeholder="wachtwoord"
        />
      </div>
      <div className="applyBar">
        <Submit
          type="submit"
          onClick={loginWithEmail}
          name="submit"
          className="bigColorBtn"
        />
        {/* <Link style={{ all: "unset" }} to="/setup">
          <input
            type="button"
            className="bigTransBtn"
            value="Maak account aan"
          />
        </Link> */}
      </div>
    </div>
  );
};
export default SignIn;
