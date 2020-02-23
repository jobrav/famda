// import React from "react";
import * as firebase from "firebase";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Route, Redirect, Link, BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components"
//context
import { ViewContext, SelectContext, DateContext, ShowContext, DocRefContext } from "../../../contexts"
// controlers
import MenuBar from "../menuBar";
import SearchBar from "../searchBar";

//dashbord
import TasksOverView from "../dashboard/tasks";
import Invites from "../dashboard/invites";
import ActivitiesForDate from "../dashboard/activitiesForDate";
import History from "../dashboard/history";

// Floating windows
import FloatWindowDefault from "../floatWindow";
import FloatHeader from "../floatHeader";
// Floatwindow items
import EditForm from "../editForm";
import CardForm from "../card"
import Profile from '../profileWindow'
import Tutorial from '../tutorial'
import DatePicker from '../datePicker'
// app windows
import ViewSize from "../viewSize";
import ViewToolbar from "../viewToolbar";
// app windowsagendaWindow
import Agenda from "../agendaWindow";
import Explore from "../explore";

//styling
const Layout = styled.section`
position: fixed;
top:0;
left:0;
bottom:0;
right:0;
width: 100vw;
height: 100vh;
overflow: hidden;
background: #000;
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 50px 1fr 50px;
`
const Dashboard = styled.section`
   grid-row:1/4;
   grid-column:1;
   justify-self:stretch;
   align-self:stretch;
   padding: 0 20px;
   background: ${({ theme: { darkMode, hue, gray6 } }) => darkMode ? hue : gray6};
    overflow-y:auto;
   display:grid;
   grid-template-column:1fr;
   grid-template-rows: 100px;
//    grid-template-rows: 100px 42.5px;
   grid-auto-flow:row;
   grid-auto-rows: max-content;
   & > div:last-child{
       margin-bottom: 100px;
   }
`
const Title = styled.h1`
    margin:0;
    padding:0;
    color: ${props => props.theme.primaryFC};
    -webkit-text-fill-color: ${props => props.theme.primaryFC};
    // font-family: -apple-system-headline, sans-serif;
    font-size: 2em;
    text-align:left;
`
const PageTitle = styled(Title)`
    grid-column:1;
    grid-row:1;
    justify-self:start;
    align-self:end;
`
const ProfilePic = styled(Link)`
overflow:hidden;
grid-row: 1;
grid-column:1;
width: 32.5px;
height: 32.5px;;
 border-radius: 25px;
 justify-self: end;
 align-self: end;
 margin-bottom: 2.5px;
 background: ${props => props.img || "#b7b7b7"};
 background-size:cover;
 background-position:center;
`
const SubTitle = styled.h2`
margin:0;
margin-top: 20px;
margin-bottom: 7.5px;
padding: 0;
color: ${props => props.theme.primaryFC};
-webkit-text-fill-color: ${props => props.theme.primaryFC};
font-size: 1.25em;
font-weight:700;
text-align: left;
grid-column: 1;
justify-self: start;
align-self: end;`


const sizeStyle = {
    titleFontSize: "20px",
    defaultFontSize: "16.5px",
    subFontSize: "10.5px",
    menuFontSize: "9px",
}

const MobileApp = React.memo(({ userData, setAppSettings, newsData, user }) => {

    let agendaSelects = userData ? userData.sources : {};
    let sources = userData ? userData.sources : [];
    // agenda array
    let listArr = ["list", "swipeList", "swipeGrid"]


    const [srchContext, setSrchContext] = useState("");
    const changeSrchCtx = useCallback(value => { setSrchContext(value) }, [setSrchContext])
    // view 
    const [view, setView] = useState(localStorage.getItem('startView') || listArr[0]);
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

    return (
        <BrowserRouter>
            <Layout>
                <ThemeProvider theme={sizeStyle}>
                    {userData.tutorial === true || <Redirect exact from={`/dashboard`} to={`/dashboard/tutorial`} />}
                    <Route exact path="/">
                        {/* <Redirect exact from='/' to={`/view/add/`} /> */}
                        <Redirect exact from='/' to={`/${localStorage.getItem('startScreen') || "dashboard"}/`} />
                    </Route>

                    <Route path={["/:base/add/:float1/:float2/", "/:base/add/:float1/", "/:base/add/"]} render={route =>
                        <FloatWindowDefault route={route}>
                            <FloatHeader title={"Nieuwe activiteit"} />
                            <EditForm /></FloatWindowDefault>
                    } />
                    <Route path={["/:base/add/test/:float1/:float2/", "/:base/add/test/:float1/", "/:base/add/test/"]} render={route =>
                        <FloatWindowDefault route={route}>
                            <FloatHeader title={"Test"} />
                            <div></div></FloatWindowDefault>
                    } />
                    <Route path={["/:base/tutorial"]} render={route =>
                        <FloatWindowDefault route={route}>
                            <FloatHeader header={{ colortag: "primaryBGC", border: false }} title={""} left={{ title: null }} right={{ title: null }} />
                            <Tutorial />
                        </FloatWindowDefault>} />

                    <DateContext.Provider value={providerDate}>
                        <Route path={["/:base/datepicker"]} render={route =>
                            <FloatWindowDefault route={route}>
                                <FloatHeader left={{ title: null }} right={{ title: "Gereed" }} title={"Overzicht"} />
                                <DatePicker />
                            </FloatWindowDefault>} />
                    </DateContext.Provider>

                    <Route path={["/:base/profile/:float1/:float2/", "/:base/profile/:float1/", "/:base/profile/"]} render={route =>
                        <FloatWindowDefault route={route}>
                            <FloatHeader left={{ title: null }} right={{ title: "Gereed" }} title={"Profiel"} />
                            <Profile settings={setAppSettings} route={route} user={userData} />
                        </FloatWindowDefault>
                    } />


                    <Route path={["/:sec/edit", "/:sec/card"]} render={route => <FloatWindowDefault route={route} >
                        <FloatHeader left={{ title: "Annuleer", link: "../" }} right={{ title: "Wijzig", link: "../edit/" }} title={"Details afspraak"} />
                        <div><Route path={["/:sec/edit"]} render={_ => <EditForm user={userData} userData={newsData} />} />
                            <Route path={["/:sec/card"]} render={_ => <CardForm user={userData} userData={newsData} />} /></div>
                    </FloatWindowDefault>} />

                    {/* Menubar */}
                    <Route path={"/:active"} render={route => <MenuBar route={route} />}></Route>

                    {/* Explore */}
                    <Route path={["/explore/:float1/:float2/", "/explore/:float1/", "/explore/"]} render={route => <Explore route={route} userData={userData} />}></Route>

                    <Route path={["/view/:float1/:float2/", "/view/:float1/", "/view/"]} render={route =>
                        <ViewContext.Provider value={providerView}>
                            <SelectContext.Provider value={providerSelect}>
                                <DateContext.Provider value={providerDate}>
                                    <Agenda source={sources} listArr={listArr} startingPoint={startPoint} view={view} source={select.id} route={route} />
                                </DateContext.Provider>
                            </SelectContext.Provider>
                        </ViewContext.Provider>
                    } />

                    <Route path={["/dashboard/:float1/:float2/", "/dashboard/:float1/", "/dashboard"]} render={({ match: { params } }) =>
                        <Dashboard className={["pannel", "returnPannel", "nonePannel"][Object.values(params).length]}>
                            {/* //Header */}
                            <PageTitle>Overzicht</PageTitle>
                            <ProfilePic to="profile/" img={`url("data:image/jpeg;base64,${userData ? userData.picture : null}")`} />
                            {/* Search when enable fix dashboard grid layout to 42.5px */}
                            {/* <SearchBar srchCtx={srchContext} changeSrchCtx={changeSrchCtx} /> */}


                            {/* Updates */}
                            <TasksOverView user={userData} date={new Date().setHours(0, 0, 0, 0)} />

                            {/* Invites */}
                            <SubTitle>Uitnodigingen</SubTitle>
                            <Invites user={user} />

                            {/* Todays apointments */}
                            <SubTitle>Afspraken</SubTitle>
                            <ActivitiesForDate user={user} date={new Date().setHours(0, 0, 0, 0)} />

                            {/* History */}
                            <SubTitle>Geschiedenis</SubTitle>
                            <History user={user} />
                        </Dashboard>
                    } />

                    <Route path="/">Niks gevonden!</Route>

                </ThemeProvider>
            </Layout>
        </BrowserRouter>
    );
});

export default MobileApp;
