// import React from "react";
import * as firebase from "firebase";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { ThemeProvider } from "styled-components"
import styled from "styled-components"
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "./App.css";
import loadUser, { userdata } from "./func/loadUser";

// sign in
import SignUp from "./components/signUp";
import Sign from "./components/default/agendaWindow/views/list/sign";

// devices
const SignIn = lazy(() => import("./components/signIn"));
const Display = lazy(() => window.innerWidth > 500 ?
  import("./components/default/defaultApp") :
  import("./components/mobile/mobileApp"))

let groupSources = [];
export let getGroupSources = () => groupSources;

const LoadingWindow = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.primaryBGC || "#fff"};
`

const App = props => {
  const db = firebase.firestore();

  const today = new Date();
  const mm = today.getMonth();
  let range = 5;
  let minView = new Date(today).setMonth(mm - range).valueOf();
  let maxView = new Date(today).setMonth(mm + range).valueOf();

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState();
  const [newsData, setNewsData] = useState();
  const [reminders, setReminder] = useState();

  const [darkMode, setDarkMode] = useState('true' == localStorage.getItem('darkmodeThemeEnabled') || false);
  const [device, setDevice] = useState("default");


  useEffect(() => {
    // const setup = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        loadUser(user).then(data => {
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
        let deviceType = width > 600 ? "default" : "mobile";
        setDevice(deviceType);



      } else setAuth(false);
    });
    // };
    // setup();
  }, [props]);

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



  const defaultColorStyles = {
    primaryBGC: darkMode ? "#121212" : "#fff",
    secondaryBGC: darkMode ? "#272727" : "#f3f3f3",
    floatBGC: darkMode ? "#121212b7" : "#ffffffb7",
    floatSecBGC: darkMode ? "#272727b7" : "#f3f3f3b7",
    lineBGC: darkMode ? "#2f2e2e9a" : "#f3f3f39a",
    //primary font color || default and hover
    primaryFC: darkMode ? "#b7b7b7" : "#403D3E",
    primaryFHC: darkMode ? "#e7e7e79a" : "#403D3E9a",
    primaryFAC: darkMode ? "#ffffff" : "#fff",
    //secondary font color || default and hover
    secondaryFC: darkMode ? "#e2e2e2" : "#b2b2b2",
    secondaryFHC: darkMode ? "#e2e2e29a" : "#b2b2b29a",
    //float font color
    floatFC: darkMode ? "#e5e5e5" : "#151515",
    //menu items
    menuIC: darkMode ? "#1377FF" : "#1377FF",
  }
  const setSettings = opt => {
    switch (opt) {
      case "darkmode":
        localStorage.setItem('darkmodeThemeEnabled', !darkMode);
        setDarkMode(p => !p);
        break;
    }

  }



  return (
    <ThemeProvider theme={defaultColorStyles}>
      <Suspense fallback={<LoadingWindow />}>
        <BrowserRouter>
          <Switch>
            {auth ? <Route render={route => (
              <Display
                route={route}
                userData={userData}
                auth={auth}
                newsData={newsData}
                reminders={reminders}
                setAppSettings={setSettings} />
            )} /> : <SignIn />}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
