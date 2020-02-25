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
const isMobile = () => (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))

const SignIn = lazy(() => import("./components/signIn"));
const Display = lazy(() => isMobile() ?
  import("./components/mobile/mobileApp") :
  import("./components/default/defaultApp"))

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

  let deviceUseDarkmode = window.matchMedia('(prefers-color-scheme: dark)');
  const [autoDarkMode, setAutoDarkMode] = useState('true' == localStorage.getItem('autoDarkmodeDisabled') || false);
  const [deviceDarkMode, setDeviceDarkMode] = useState(deviceUseDarkmode.matches)
  const [darkMode, setDarkMode] = useState(false);

  deviceUseDarkmode.addListener(e => setDeviceDarkMode(e.matches))

  useEffect(() => {

    if (!autoDarkMode) setDarkMode(deviceDarkMode || false)
    else setDarkMode('true' == localStorage.getItem('darkmodeThemeEnabled') || false)

  }, [autoDarkMode, deviceDarkMode])


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
    switch (opt.type) {
      case "darkmode":
        localStorage.setItem('darkmodeThemeEnabled', opt.val);
        setDarkMode(() => opt.val);
        break;
      case "autoDarkmode":
        localStorage.setItem('autoDarkmodeDisabled', opt.val);
        setAutoDarkMode(() => opt.val);
        break;
    }
    return opt.val
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
