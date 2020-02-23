// import React from "react";
import * as firebase from "firebase";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { ThemeProvider } from "styled-components"
import styled from "styled-components"
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "./App.css";
import loadUser, { userdata } from "./func/loadUser";
//loading
import LoadingScreen from "./components/loading"
import smoothscroll from 'smoothscroll-polyfill';

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
  smoothscroll.polyfill();
  const db = firebase.firestore();

  const today = new Date();
  const mm = today.getMonth();
  let range = 5;
  let minView = new Date(today).setMonth(mm - range).valueOf();
  let maxView = new Date(today).setMonth(mm + range).valueOf();

  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState();
  const [newsData, setNewsData] = useState();
  const [reminders, setReminder] = useState();

  const autoDarkmodeDisabled = 'true' == localStorage.getItem('autoDarkmodeDisabled')
  const deviceUseDarkmode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const mode = autoDarkmodeDisabled ? 'true' == localStorage.getItem('darkmodeThemeEnabled') : deviceUseDarkmode;
  console.log(autoDarkmodeDisabled, deviceUseDarkmode, mode)
  const [darkMode, setDarkMode] = useState(mode || false);
  const [device, setDevice] = useState("default");


  useEffect(() => {
    // const setup = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser(user)
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
    //dark mode enabled
    darkMode,
    //black white
    hue: darkMode ? "#000000" : "#ffffff",
    hueReverse: darkMode ? "#ffffff" : "#000000",
    //grays
    gray1: darkMode ? "#8e8e93" : "#8e8e93",
    gray2: darkMode ? "#636366" : "#aeaeb2",
    gray3: darkMode ? "#48484a" : "#c7c7cc",
    gray4: darkMode ? "#3a3a3c" : "#d1d1d6",
    gray5: darkMode ? "#2c2c2e" : "#e5e5ea",
    gray6: darkMode ? "#1c1c1e" : "#f2f2f7",
    //Colors
    blue: darkMode ? "#0a84ff" : "#007aff",
    green: darkMode ? "#30d158" : "#34c759",
    indigo: darkMode ? "#5e5ce6" : "#5856d6",
    orange: darkMode ? "#ff9f0a" : "#ff9500",
    pink: darkMode ? "#ff375f" : "#ff2d55",
    purple: darkMode ? "#bf5af2" : "#af52de",
    red: darkMode ? "#ff453a" : "#ff3b30",
    teal: darkMode ? "#64d2ff" : "#5ac8fa",
    yellow: darkMode ? "#ffd60a" : "#ffcc00",

    name: darkMode ? "" : "",




    primaryBGC: darkMode ? "#000000" : "#f2f2f7",
    secondaryBGC: darkMode ? "#1c1c1e" : "#ffffff",
    tertiaryBGC: darkMode ? "#3a3a3c" : "#e4e5ea",
    floatBGC: darkMode ? "#121212b7" : "#ffffffb7",
    floatSecBGC: darkMode ? "rgba(39, 39, 39, 0.8)" : "rgba(243, 243, 243, 0.8)",
    lineBGC: darkMode ? "#2f2e2e9a" : "#f2f2f79a",
    //primary font color || default and hover
    primaryFC: darkMode ? "#fff" : "#1c1c1e",
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
        {auth !== null ?
          auth === true ?
            // <Route render={route => (
            <Display
              userData={userData}
              auth={auth}
              user={user}
              newsData={newsData}
              reminders={reminders}
              setAppSettings={setSettings} />
            // )} />
            : <SignIn />
          : <LoadingScreen />}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
