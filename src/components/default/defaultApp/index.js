// import React from "react";
import * as firebase from "firebase";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./defaultApp.css";
import styled, { ThemeProvider } from "styled-components"
//context
import { ViewContext, SelectContext, DateContext, ShowContext, DocRefContext } from "../../../contexts"

//assets
import SearchBar from "../searchBar/index";
import ViewSize from "../viewSize";
import ViewTools from "../viewTools";
import MenuSelect from "../menuSelect";
import DatePicker from "../datePicker"
import MenuList from "../menuList"
import DocFinder from "../docFinder"
import ContextMenu from "../contextMenu"

// controlers
import MenuBar from "../menuBar";
// windows
import Agenda from "../agendaWindow";
// import Menu from "../menuWindow";
import Profile from "../profileWindow";
import News from "../newsWindow";
import SearchFeed from "../searchFeed";
import Docs from "../docsWindow";
import FloatWindowDefault from "../floatWindow";

import { userdata } from "../../../func/loadUser";

let groupSources = [];

//styling
const Layout = styled.section`
width: 100vw;
height: 100vh;
overflow: hidden;
background: ${props => props.theme.primaryBGC || "white"};
display: grid;
grid-template-columns: 190px 1fr auto;
grid-template-rows: 50px auto;

@media screen and (max-width: 920px) and (min-width: 600px){
  grid-template-columns: 190px 1fr;
  grid-template-rows: 65px auto;
}
@media screen and (max-width: 600px){
  grid-template-columns: 50px 1fr;
  grid-template-rows: 65px auto;
}
`
const Text = styled.div`
cursor: ${props => props.select ? "text" : "default"};
align-self: ${props => props.align || "none"};
justify-self: ${props => props.justify || "none"};
font-weight: ${props => props.bold ? "600" : "300"};
color: ${props => props.theme.primaryFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.primaryFC || "#272727"};
`
const TextL = styled(Text)`
font-size: ${props => props.theme.titleFontSize};
`
const TextM = styled(Text)`
font-size: ${props => props.theme.defaultFontSize};
`
const TextS = styled(Text)`
font-size: ${props => props.theme.subFontSize};
`
const Logo = styled.svg`
margin-left: 20px; 
 height: 20px
 justify-self: start;
 align-self: center;
 grid-column: 1;
 grid-row: 1;
 @media screen and (max-width: 600px){
  display: none;
}
`
const ProfilePic = styled(Link)`
overflow:hidden;
 width: 25px;
 height: 25px
 border-radius: 25px;
 justify-self: center;
 align-self: center;
 grid-row: 1;
 @media screen and (min-width: 600px){
  grid-column: 2;
  justify-self: end;
  margin-right: 20px;
}
`
const Image = styled.img`
 width: 100%;
 height: 100%;
`
const Header = styled.section`
display: grid;
position: relative;
background: ${props => props.theme.primaryBGC || "#fff"}
width: 100%;
height: 100%;
`
const SearchHeader = styled(Header)`
grid-row: 1;
grid-column: 3;
@media screen and (max-width: 920px) {
  display: none;
}
`
const NavAgenda = styled(Header)`
grid-row: 1;
grid-column: 2;
grid-gap: 5px;
grid-template-columns: repeat(3, auto);
`
const UserInfoCard = styled(Header)`
grid-row: 1;
grid-column: 1;
grid-template-columns: auto 1fr;
grid-template-rows: 1fr;
grid-gap: 0 5px;
@media screen and (max-width: 600px){
  grid-template-columns: 1fr;
}
`

const sizeStyle = {
  titleFontSize: "17px",
  defaultFontSize: "13.5px",
  subFontSize: "10px",
}

export let getGroupSources = () => groupSources;

const DefaultApp = React.memo(({ setAppSettings, auth, userData, newsData, reminders, route }) => {

  const [contextPos, setContextPos] = useState({ x: 0, y: 0 })
  const [contextMenuShow, setContextMenuShow] = useState(false)

  useEffect(() => {
    const setup = () => {
      document.addEventListener('contextmenu', showMenu)
    };
    setup()
  }, [])
  const showMenu = (ev) => {
    ev.preventDefault()
    setContextPos({ "x": ev.clientX, "y": ev.clientY })
    setContextMenuShow(true);
    document.addEventListener('click', hideMenu)
  }
  const hideMenu = (ev) => {
    setContextMenuShow(false);
    document.removeEventListener('click', hideMenu)
  }

  const [srchContext, setSrchContext] = useState("");
  const changeSrchCtx = useCallback(value => { setSrchContext(value) }, [setSrchContext])


  let agendaSelects = userData ? userData.sources : {};
  let sources = userData ? userData.sources : [];
  // agenda array
  let listArr = ["Lijst", "Dag", "Week"]

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
    <Layout>

      <ThemeProvider theme={sizeStyle}>
        {contextMenuShow && <ContextMenu contextPos={contextPos} />}
        <Redirect exact from='/' to='/view/' />

        <Route path={["/docs/", "/view/", "/profile/"]} render={route => <MenuBar route={route} />}></Route>

        <Route path={["/:sec/add"]} render={route => <FloatWindowDefault title={"Nieuwe activiteit"} route={route} >
          <News user={userData} userData={newsData} />
        </FloatWindowDefault>} />

        <Route path={["/:sec/card"]} render={route => <FloatWindowDefault title={"Afspraak"} route={route} >
          <News user={userData} userData={newsData} />
        </FloatWindowDefault>} />

        <Route path={["/profile/edit"]} render={route => <FloatWindowDefault route={route} >
          acount editen
      </FloatWindowDefault>} />


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


        <UserInfoCard>
          <Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.09 114.6">
            <g id="Laag_2" data-name="Laag 2"><g id="Laag_2-2" data-name="Laag 2">
              <g id="Laag_5" data-name="Laag 5">
                <path className="cls-1" d="M425.72,103.6l-6.85-21.69L402.66,30.6l-7.9-25A8,8,0,0,0,387.14,0H357.06a8,8,0,0,0-7.7,5.83l-2,7-5.61,20-3.19,11.36-16.26,57.94-.47,1.67a8,8,0,0,0,7.7,10.15h15a8,8,0,0,0,7.8-6.28l4.26-19.44a8,8,0,0,1,7.8-6.28h10.69a8,8,0,0,1,7.63,5.61l6.5,20.78a8,8,0,0,0,7.63,5.61h21.21A8,8,0,0,0,425.72,103.6Zm-52.79-44-6.15-.23a8,8,0,0,1-7.62-9L360.67,39l.41-3.09a8,8,0,0,1,15.59-1.18l4.24,14.6a2.66,2.66,0,0,1,.07.27A8,8,0,0,1,372.93,59.57Z" />
                <path className="cls-1" d="M339.44,50.31q-.33-3.16-.86-6.07A65.62,65.62,0,0,0,335.2,32a46.1,46.1,0,0,0-15.91-21.18C301-2.49,275.07-.34,260.35,2.4a13.61,13.61,0,0,0-4.2,1.52A13.88,13.88,0,0,0,249,16.08v84.38a13.9,13.9,0,0,0,9.46,13.18,13.73,13.73,0,0,0,4.46.74h11.87c.37,0,.74,0,1.11,0,3.89.31,28.82,1.67,46.42-12.24C333.88,93,342.28,77.29,339.44,50.31ZM299,90.06c-9.18,5.48-20.84-1.38-20.84-12.08V36.74c0-11.23,12.73-18,21.83-11.45,4.1,3,7.79,7.85,10,15.75a64.52,64.52,0,0,1,2.09,15.87C312.53,76.4,306.29,85.74,299,90.06Z" />
                <path className="cls-1" d="M258.46,113.64A8.12,8.12,0,0,1,256,114H240.31a8.53,8.53,0,0,1-8.52-8.3l-.43-17.58-.93-37.67a2.2,2.2,0,0,0-4.35-.45l-13.69,59.29a2.2,2.2,0,0,1-2.14,1.71h-19.6a2.21,2.21,0,0,1-2.12-1.58L180.2,77.77,171.82,46a2.21,2.21,0,0,0-4.32.54l-1,27.19-1.26,34a6.56,6.56,0,0,1-1.8,4.27,6.48,6.48,0,0,1-4.75,2H144a6.57,6.57,0,0,1-6.55-7l1.36-19.4,3.42-48.72.39-5.53,1.51-21.54A12.68,12.68,0,0,1,156.82,0h19a12.67,12.67,0,0,1,12.39,10l11.92,35.13a2.21,2.21,0,0,0,4.29.11l15.1-35.87A12.67,12.67,0,0,1,231.71,0H247a12.65,12.65,0,0,1,12.66,12l.13,2.48,2.86,54.22L264.53,105A8.51,8.51,0,0,1,258.46,113.64Z" />
                <path className="cls-1" d="M162.72,103.6,142.27,38.86,133,9.53l-1.25-3.94A8,8,0,0,0,124.14,0H94.06a8,8,0,0,0-7.7,5.83l-.17.62L78.17,35l-2,7-1.33,4.75-3,10.67L67.13,74.36l-8.28,29.49A8,8,0,0,0,66.55,114h15a8,8,0,0,0,7.8-6.28l4.26-19.44a8,8,0,0,1,7.8-6.28h10.69a8,8,0,0,1,7.63,5.61l6.5,20.78a8,8,0,0,0,7.63,5.61h21.21a8,8,0,0,0,7.63-10.4Zm-52.79-44-4.09-.15-2.06-.08a8,8,0,0,1-7.62-9l1.92-14.35a7.6,7.6,0,0,1,.43-1.72A8,8,0,0,1,105.8,29h.2a8,8,0,0,1,7.67,5.76l4.24,14.6A8,8,0,0,1,109.93,59.57Z" /><path className="cls-1" d="M87.62,14.15c0,3-.38,6-.38,8.3A13.23,13.23,0,0,1,74,35.69H48.13c-7.08,0-13.23-.75-16.36,5.45a16,16,0,0,0-1.11,3c-.08.29-.16.6-.23.92a42.13,42.13,0,0,0-.83,9.14v.16l.26,11.12L30,72.39l.16,7h0l.2,8.48V105.4a8.57,8.57,0,0,1-7,8.73,11,11,0,0,1-3.53.08l-3.42-.42a11.38,11.38,0,0,0-3.14,0,38.74,38.74,0,0,1-4.81.47c-4.77-.63-8.45-3.16-8.45-8.1V22.84q0-1,.09-2A22.19,22.19,0,0,1,18.12,1,21.14,21.14,0,0,1,22.2.64H74c7,0,10.52,2.43,12.19,5.81a12.83,12.83,0,0,1,1.07,3.31A23.58,23.58,0,0,1,87.62,14.15Z" />
                <path className="cls-1" d="M83,54c0,.75,0,1.5-.07,2.23-.09,2.07-.29,4-.29,5.63a11.75,11.75,0,0,1-.22,2.31A12.54,12.54,0,0,1,70.13,74.36H45.62c-6.66,0-12.46-.7-15.44,5h0a16.31,16.31,0,0,0-1.39,4.08L11.7,83,0,82.67V62.16a21,21,0,0,1,21-21H70.13a18.65,18.65,0,0,1,6.08.87,9.55,9.55,0,0,1,4,2.48C82.51,47,83,50.48,83,54Z" /><path className="cls-2" d="M161.72,110.46c.57.51,1.14,1,1.71,1.49a6.48,6.48,0,0,1-4.75,2h-24.8a8,8,0,0,1-7.63-5.61l-6.5-20.78A8,8,0,0,0,112.12,82H101.43a8,8,0,0,0-7.8,6.28l-4.26,19.44a8,8,0,0,1-7.8,6.28h-15a8,8,0,0,1-7.7-10.15l8.28-29.49H45.62c-6.66,0-12.46-.7-15.44,5h0l.2,8.48V105.4a8.57,8.57,0,0,1-7,8.73,11,11,0,0,1-3.53.08l-3.42-.42a11.38,11.38,0,0,0-3.14,0,38.74,38.74,0,0,1-4.81.47c-4.77-.63-8.45-3.16-8.45-8.1V90.93Q5.89,86.71,11.7,83,21,77,30,72.39c14.95-7.73,29.11-12.74,41.86-15A87.17,87.17,0,0,1,83,56.18,62.13,62.13,0,0,1,98.8,57.34a44.57,44.57,0,0,1,7,2.08A37.76,37.76,0,0,1,117,66c7.09,6.08,14.45,13.77,21.85,21.58C146.48,95.61,154.18,103.78,161.72,110.46Z" /><path className="cls-2" d="M418.09,114H396.88a8,8,0,0,1-7.63-5.61l-6.5-20.78A8,8,0,0,0,375.12,82H364.43a8,8,0,0,0-7.8,6.28l-4.26,19.44a8,8,0,0,1-7.8,6.28h-15a8,8,0,0,1-7.7-10.15l.47-1.67c-17.6,13.91-42.53,12.55-46.42,12.24-.37,0-.74,0-1.11,0H262.92a13.73,13.73,0,0,1-4.46-.74A8.12,8.12,0,0,1,256,114H240.31a8.53,8.53,0,0,1-8.52-8.3l-.43-17.58A65,65,0,0,1,249,74.31a76.33,76.33,0,0,1,13.62-5.6c.78-.25,1.57-.48,2.38-.71a120,120,0,0,0,13.21-4.51V78c0,10.7,11.66,17.56,20.84,12.08,7.24-4.32,13.48-13.66,13.07-33.15A64.52,64.52,0,0,0,310,41a47,47,0,0,1,15-8,27,27,0,0,1,10.2-1,65.62,65.62,0,0,1,3.38,12.27l3.19-11.36A95.34,95.34,0,0,1,360.67,39l-1.51,11.26a8,8,0,0,0,7.62,9l6.15.23a8,8,0,0,0,8-9.94c15.38,9.39,29.67,21.24,37.89,32.28l6.85,21.69A8,8,0,0,1,418.09,114Z" /><path className="cls-3" d="M131.76,5.59A8,8,0,0,0,124.14,0H94.06a8,8,0,0,0-7.7,5.83l-.17.62C84.52,3.07,81,.64,74,.64H22.2A21.14,21.14,0,0,0,18.12,1a22.19,22.19,0,0,0-18,19.84c10.48,6,17.65,12.2,27,20.28,1.14,1,2.31,2,3.53,3L34,47c9.15,7.7,24.78,6.14,40.88-.24,1.76-.7,3.53-1.45,5.3-2.27A130.42,130.42,0,0,0,98.51,34.22c2.51-1.67,5-3.41,7.29-5.21A106.42,106.42,0,0,0,121,15c5.46-6.25,9.17-7.48,12-5.47ZM70.13,41.14H31.77c3.13-6.2,9.28-5.45,16.36-5.45H74A13.34,13.34,0,0,0,78.17,35l-2,7A18.65,18.65,0,0,0,70.13,41.14Z" /><path className="cls-3" d="M319.29,10.79C297.42,10,275.94,10.81,265,13a34.19,34.19,0,0,0-5.24,1.49A43.41,43.41,0,0,0,249,20.42C233.35,32,222.46,52.83,211,62c-9,7.23-19.52,15.55-30.8,15.77L171.82,46a2.21,2.21,0,0,0-4.32.54l-1,27.19A42.87,42.87,0,0,1,157,65c-7.27-8.72-11.23-20.88-14.34-31.67l1.51-21.54A12.68,12.68,0,0,1,156.82,0h19a12.67,12.67,0,0,1,12.39,10l11.92,35.13a2.21,2.21,0,0,0,4.29.11l15.1-35.87A12.67,12.67,0,0,1,231.71,0H247a12.7,12.7,0,0,1,9.18,3.92,13.61,13.61,0,0,1,4.2-1.52C275.07-.34,301-2.49,319.29,10.79Z" />
                <path className="cls-3" d="M402.66,30.6c-6.58-.69-13.45-2.76-18.66-7.6s-19.45-8.13-36.62-10.13l2-7A8,8,0,0,1,357.06,0h30.08a8,8,0,0,1,7.62,5.59Z" /></g></g></g>
          </Logo>
          {userData && <ProfilePic to="/profile">
            <Image style={{ background: `url("data:image/jpeg;base64,${userData ? userData.picture : null}")` }} />
          </ProfilePic>}
        </UserInfoCard>


        {/* news wall and search */}
        <SearchHeader>
          <SearchBar srchCtx={srchContext[0]} changeSrchCtx={changeSrchCtx} />
        </SearchHeader>
        {srchContext ? <SearchFeed srchCntx={srchContext} changeSrchCtx={changeSrchCtx} /> : null}

        <News user={userData} userData={newsData} />



        <Route path={["/docs/:root1/:root2/:root3", "/docs/:root1/:root2", "/docs/:root1/", "/docs/"]} render={route =>
          <DocRefContext.Provider value={providerDocRef}>
            <DocFinder user={userData} />
            <Docs route={route} />
          </DocRefContext.Provider>
        } />

        <Route
          exact
          path={["/profile", "/profile/:layer"]}
          render={route => <Profile settings={setAppSettings} route={route} user={userData} />}
        />
      </ThemeProvider>
    </Layout>
  );
});

export default DefaultApp;
