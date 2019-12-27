// import React from "react";
import * as firebase from "firebase";
import React, { useState, useCallback, useMemo } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./defaultApp.css";
import styled from "styled-components"
//context
import { ViewContext, SelectContext, DateContext, ShowContext, DocRefContext } from "../../contexts"

//assets
import SearchBar from "../searchBar/index";
import ViewSize from "../viewSize";
import ViewTools from "../viewTools";
import MenuSelect from "../menuSelect";
import DatePicker from "../datePicker"
import MenuList from "../menuList"
import DocFinder from "../docFinder"

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
cursor: ${props => props.select ? "text" : "default"};
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
`
const Header = styled.section`
display: grid;
position: relative;
background: ${props => props.theme.primaryBGC || "#fff"}
width: 100%;
height: 100%;
`
const NavAgenda = styled(Header)`
grid-row: 1;
grid-column: 2;
grid-gap: 5px;
grid-template-columns: repeat(3, auto);
`
const UserInfoCard = styled(Header)`
cursor: pointer;
grid-row: 1;
grid-column: 1;
grid-template-columns: auto 40px;
grid-template-rows: 1fr 1fr;
grid-gap: 0 5px;
`


export let getGroupSources = () => groupSources;

const DefaultApp = React.memo(({ auth, userData, newsData, reminders, route }) => {

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
  const [select, setSelect] = useState({ id: agendaSelects[key], name: key } || {});
  const providerSelect = useMemo(() => ({ select, setSelect }), [select, setSelect])
  // date 
  const [startPoint, setStartPoint] = useState(new Date());
  const providerDate = useMemo(() => ({ startPoint, setStartPoint }), [startPoint, setStartPoint])
  // what to show 
  const [show, setShow] = useState({ datePicker: false, groupSource: false });
  const providerShow = useMemo(() => ({ show, setShow }), [show, setShow])
  // ref
  const [docRef, setDocRef] = useState(['base']);
  const providerDocRef = useMemo(() => ({ docRef, setDocRef }), [docRef, setDocRef])



  const onChange = e => {

  };

  return (
    // <TransitionGroup component={null}>
    <div className="App">
      <Redirect exact from='/' to='/view/' />

      <CSSTransition
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
      </CSSTransition>

      <Route path={["/docs/", "/view/", "/profile/"]} render={route => <MenuBar route={route} />}></Route>

      <ViewContext.Provider value={providerView}>
        <SelectContext.Provider value={providerSelect}>
          <DateContext.Provider value={providerDate}>
            <ShowContext.Provider value={providerShow}>
              <Route
                path={"/view/"}
                render={route => <Agenda source={sources} listArr={listArr} startingPoint={startPoint} view={view} source={select.id} route={route} />}
              />
              <Route
                path={"/view/"}
                render={_ => (<NavAgenda >
                  <MenuSelect allSelect={agendaSelects} />
                  <ViewSize listArr={listArr} onChange={onChange} />
                  <ViewTools />
                  {show.datePicker ? <DatePicker /> : null}
                  {show.groupSource ? <MenuList allSelect={agendaSelects} /> : null}
                </NavAgenda>)}
              />
            </ShowContext.Provider>
          </DateContext.Provider>
        </SelectContext.Provider>
      </ViewContext.Provider>

      <Link to="/profile">
        <UserInfoCard>
          <TextM justify="end" align="end" bold>Jochem van der valk</TextM>
          {userData && <ProfilePic style={{ background: `url("data:image/jpeg;base64,${userData ? userData.picture : null}")` }} />}
          <TextS justify="end" align="top">online - gesynchroniseerde</TextS>
        </UserInfoCard>
      </Link>

      {/* news wall and search */}
      <div className="header searchHead" >
        <SearchBar srchCtx={srchContext[0]} changeSrchCtx={changeSrchCtx} />
      </div>
      {srchContext ? <SearchFeed srchCntx={srchContext} /> : null}
      <News user={userData} userData={newsData} />



      <Route path={["/docs/:root1/:root2/:root3", "/docs/:root1/:root2", "/docs/:root1/", "/docs/"]} render={route =>
        <DocRefContext.Provider value={providerDocRef}>
          <DocFinder />
          <Docs route={route} />
        </DocRefContext.Provider>
      } />

      <Route
        exact
        path="/profile"
        render={route => <Profile route={route} user={userData} />}
      />
    </div>
    // </TransitionGroup>
  );
});

export default DefaultApp;
