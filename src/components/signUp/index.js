import React, { useState } from "react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import "./style.css";

const SignUp = props => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const createUser = () => {
    if (user && email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }
  };

  return (
    <div className="backgroud">
      <div className="form">
        <input
          type="name"
          id="name"
          className="input"
          placeholder="Hans Pieterson"
          onBlur={e => {
            const value = e.currentTarget.value;
            e.currentTarget.style.border =
              value && "rgb(0, 122, 255) 2.5px solid";
            value ? setUser(value) : setUser(null);
          }}
        />
        <input
          type="email"
          id="email"
          className="input"
          placeholder="erik@gmail.com"
          onBlur={e => {
            const value = e.currentTarget.value;
            e.currentTarget.style.border =
              value && "rgb(0, 122, 255) 2.5px solid";
            value ? setEmail(value) : setEmail(null);
          }}
        />
        <input
          type="password"
          id="password"
          className="input"
          placeholder="wachtwoord"
          onBlur={e => {
            const value = e.currentTarget.value;
            e.currentTarget.style.border =
              value.length > 8 && "rgb(0, 122, 255) 2.5px solid";
            value.length > 8 ? setPassword(value) : setPassword(null);
          }}
        />
      </div>
      <div className="applyBar">
        <input
          onClick={createUser}
          type="submit"
          name="submit"
          value="Opslaan"
          className="bigColorBtn"
        />
      </div>
    </div>
  );
};
export default SignUp;
