// import React from "react";
import * as firebase from "firebase";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components"
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "./App.css";
import loadUser, { userdata } from "./func/loadUser";
import autoLoader from "./func/autoLoader";


// sign in
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";

// devices
import MobileApp from "./components/mobileApp";
import DefaultApp from "./components/defaultApp";

let groupSources = [];
export let getGroupSources = () => groupSources;

const App = props => {
  const db = firebase.firestore();
  // db.enablePersistence().catch(function(err) {
  //   if (err.code === "failed-precondition") {
  //   } else if (err.code === "unimplemented") {
  //   }
  // });

  const today = new Date();
  const mm = today.getMonth();
  let range = 5;
  let minView = new Date(today).setMonth(mm - range).valueOf();
  let maxView = new Date(today).setMonth(mm + range).valueOf();

  const [auth, setAuth] = useState(false);
  const [setup, setSetup] = useState(true);
  const [userData, setUserData] = useState();
  const [newsData, setNewsData] = useState();
  const [reminders, setReminder] = useState();

  const [darkMode, setDarkMode] = useState(false);
  const [device, setDevice] = useState("default");


  useEffect(() => {
    // const setup = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        loadUser(user).then(data => {
          console.log(getCalendars(data));
          setUserData(data);
          groupSources = data.sources.alles;
          setAuth(true);
          // groupSources &&
          //   autoLoader(groupSources, null, true).then(val => {
          //     setChunks(val.chunks);
          //     setChunkBorder(val.chunkBorder);
          //   });
        });

        // getUserData(user).then(val => setNewsData(val));
        // getReminders(user).then(val => setReminder(val));
        let width = window.innerWidth;
        let deviceType = width > 800 ? "default" : "mobile";
        setDevice(deviceType);



      } else setAuth(false);
    });
    // };
    // setup();
  }, [props]);

  const getReminders = user => {
    return new Promise(resolve => {
      fetchUserData(user.uid, "reminders").then(e => resolve(e));
    });
  };

  const getUserData = user => {
    return new Promise(resolve => {
      fetchUserData(user.uid, "userData").then(e => resolve(e));
    });
  };

  const fetchUserData = (user, collection) => {
    return new Promise(resolve => {
      db.collection("users")
        .doc(user)
        .collection(collection)
        .get()
        .then(data => {
          let bucket = {};
          data.forEach(doc => (bucket[doc.id] = doc.data()));
          resolve(bucket);
        });
    });
  };

  const getCalendars = data => {
    let cals = data.allSources;
    cals.map(cal => {
      return db
        .collection("calendars")
        .doc(cal)
        .get()
        .then(data => {
          let doc = data.data();
          //console.log(doc);
          return doc;
        });
    });
    return cals;
  };


  const defaultColorStyles = {
    primaryBGC: darkMode ? "#121212" : "#fff",
    secondaryBGC: darkMode ? "#121212" : "#efefefb9",
    //primary font color || default and hover
    primaryFC: darkMode ? "#white" : "#b7b7b7",
    primaryFHC: darkMode ? "#white" : "#b7b7b79a",
    primaryFAC: darkMode ? "#white" : "#fff",
    //secondary font color || default and hover
    secondaryFC: darkMode ? "#white" : "#b7b7b7",
    secondaryFHC: darkMode ? "#white" : "#b7b7b79a",
    //menu items
    menuIC: darkMode ? "#409fff" : "#409fff",
  }

  return (
    <ThemeProvider theme={defaultColorStyles}>
      <BrowserRouter>
        {(setup && auth) ? (
          <Route render={route => (
            device == "mobile" ? (
              <MobileApp
                userData={userData}
                auth={auth}
                newsData={newsData}
                reminders={reminders}
              />
            ) : (
                <DefaultApp
                  route={route}
                  userData={userData}
                  auth={auth}
                  newsData={newsData}
                  reminders={reminders}
                />
              )
          )} />
        ) : (
            <div className="App">
              <Route exact path="/" component={SignIn} />
              <Route exact path="/setup" component={SignUp} />
            </div>
          )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;