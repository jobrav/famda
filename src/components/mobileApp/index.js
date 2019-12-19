// import React from "react";
import * as firebase from "firebase";
import React, { useState, useCallback, useMemo } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../defaultApp/defaultApp.css";
import styled from "styled-components"
//context
import { ViewContext, SelectContext, DateContext } from "../../contexts"

//assets
import SearchBar from "../searchBar/index";
import ViewSize from "../viewSize";
import ViewTools from "../viewTools";
import MenuSelect from "../menuSelect";
import DatePicker from "../datePicker"

// controlers
import MenuBar from "../menuBar";
import InfoCard from "../infoCard";
// windows
import Agenda from "../agendaWindow";
import Menu from "../menuWindow";
import Profile from "../profileWindow";
import News from "../newsWindow";
import SearchFeed from "../searchFeed";
import Docs from "../docsWindow";

import AddActivity from "../addWindow/activity";
import AddCalendar from "../addWindow/calendar";
import AddMenu from "../addWindow/menu";
import { userdata } from "../../func/loadUser";

let groupSources = [];
export let getGroupSources = () => groupSources;

const MobileApp = React.memo(({ auth, userData, newsData, reminders, route }) => {

  const [srchContext, setSrchContext] = useState("");
  const changeSrchCtx = useCallback(value => { setSrchContext(value) }, [setSrchContext])


  const today = new Date();


  const baseLinks = ["/", "/todo/", "/search/", "/news/", "/docs/"];
  const editCalendarLinks = [
    "/add/calendar",
    "/add/calendar/:id",
    "/news/add/calendar",
    "/news/add/calendar/:id",
    "/docs/add/calendar",
    "/docs/add/calendar/:id"
  ];
  const editActivityLinks = [
    "/add/activity",
    "/add/activity/:id",
    "/news/add/activity",
    "/news/add/activity/:id",
    "/docs/add/activity",
    "/docs/add/activity/:id"
  ];
  const editMenuLinks = ["/add/menu", "/news/add/menu", "/docs/add/menu"];
  const editLinks = [
    "/card/:id",
    "/add/:type",
    "/add/:type/:sub",
    "/menu/:id",
    "/view/:type"
  ];

  let agendaSelects = userData ? userData.sources : {};
  let sources = userData ? userData.sources : [];
  // agenda array
  let listArr = ["Lijst", "Dag", "Week", "Maand"]

  // view 
  const [view, setView] = useState(listArr[1]);
  const providerView = useMemo(() => ({ view, setView }), [view, setView])
  // select
  let key = Object.keys(agendaSelects)[0]
  const [select, setSelect] = useState(agendaSelects[key] || []);
  const providerSelect = useMemo(() => ({ select, setSelect }), [select, setSelect])
  // date 
  const [show, setShow] = useState(false);
  const providerDate = useMemo(() => ({ show, setShow }), [show, setShow])

  //styling
  const Layout = styled.section`
    width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: white;
  display: grid;
  grid-template-columns: 190px 1fr auto;
  grid-template-rows: 65px auto;
  `
  const Text = styled.div`
  align-self: ${props => props.align || "none"};
  justify-self: ${props => props.justify || "none"};
  font-weight: ${props => props.bold ? "600" : "300"};
  `
  const TextL = styled(Text)`
  font-size: 14.5px;
  `
  const TextM = styled(Text)`
  font-size: 12.5px;
  `
  const TextS = styled(Text)`
  font-size: 8px;
  `
  const ProfilePic = styled.img`
    width: 25px;
    height: 25px
    border-radius: 25px;
    justify-self: start;
    align-self: center;
    grid-column: 2;
    grid-row: 1/3;
    background: url("data:image/jpeg;base64,${userData ? userData.picture : null}")
  `
  const MenuBar = styled.section`
  grid-column: 1;
  grid-row: 2;
  width: 100vw;
  height: 25px;
  `
  const Header = styled.section`
  display: grid;
  position: relative;
  width: 100%;
  height: 100%;
  `
  const NavAgenda = styled(Header)`
  grid-row: 1;
  grid-column: 1;
  justify-self: center;
  align-self: end;
  grid-gap: 5px;
  height: 50px;
  padding: 0 10px;
  width: calc(100vw - 20px);
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  `
  const UserInfoCard = styled(Header)`
  grid-row: 1;
  grid-column: 1;
  grid-template-columns: auto 40px;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0 5px;
  `


  const onChange = e => {

  };

  return (
    <TransitionGroup component={null}>
      <div className="AppMobile">
        <Redirect exact from='/' to='/view/' />

        {/* <CSSTransition
          key={route.location.pathname}
          timeout={0}
          classNames=""
        >
          <Switch location={route.location}>
            <Route
              exact
              path={editActivityLinks}
              component={AddActivity}
            />
            <Route
              exact
              path={editCalendarLinks}
              component={AddCalendar}
            />
            <Route exact path={editMenuLinks} component={AddMenu} />
            <Route exact path={"/card/:id"} component={InfoCard} />
            <Route exact path={["/menu", "/menu/:id"]} component={Menu} />
          </Switch>
        </CSSTransition> */}

        <Route path={baseLinks} component={MenuBar} />

        <ViewContext.Provider value={providerView}>
          <SelectContext.Provider value={providerSelect}>
            <DateContext.Provider value={providerDate}>
              <Route
                path={"/view/"}
                render={route => <Agenda source={sources} listArr={listArr} startingPoint={today} view={view} source={select} route={route} />}
              />
              <Route
                path={"/view/"}
                render={_ => (<NavAgenda >
                  {/* <ViewSize listArr={listArr} onChange={onChange} /> */}
                  <MenuSelect allSelect={agendaSelects} />
                  <ViewTools />
                  {show ? <DatePicker /> : null}
                </NavAgenda>)}
              />
            </DateContext.Provider>
          </SelectContext.Provider>
        </ViewContext.Provider>

        {/* <Link to="/profile">
          <UserInfoCard>
            <TextM justify="end" align="end" bold>Jochem van der valk</TextM>
            {userData && <ProfilePic />}
            <TextS justify="end" align="top">Klik voor meer informatie</TextS>
          </UserInfoCard>
        </Link> */}

        {/* news wall and search */}
        <div className="header searchHead" >
          <SearchBar srchCtx={srchContext[0]} changeSrchCtx={changeSrchCtx} />
        </div>
        {srchContext ? <SearchFeed srchCntx={srchContext} /> : <News user={userData} userData={newsData} />}




        {/* <Route path={["/docs/:root1/:root2/:root3", "/docs/:root1/:root2", "/docs/:root1/", "/docs/"]} render={route => <Docs route={route} />} /> */}

        {/* <Route
          exact
          path="/profile"
          render={route => <Profile route={route} user={userData} />}
        /> */}
      </div>
    </TransitionGroup>
  );
});

export default MobileApp;
