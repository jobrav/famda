// import React from "react";
import * as firebase from "firebase";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components"
//context
import { ViewContext, SelectContext, DateContext, ShowContext, DocRefContext } from "../../../contexts"
// controlers
import MenuBar from "../menuBar";
import SearchBar from "../searchBar";

//dashbord
import ActivitiesForDate from "../dashboard/activitiesForDate";
import TasksOverView from "../dashboard/tasks";
import Invites from "../dashboard/invites";

// Floating windows
import FloatWindowDefault from "../floatWindow";
// Floatwindow items
import EditForm from "../editForm";
import CardForm from "../card"
import Profile from '../profileWindow'
// app windows
import ViewSize from "../viewSize";
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
   background: ${props => props.theme.primaryBGC};

   display:grid;
   grid-template-column:1fr;
   grid-template-rows: 100px;
//    grid-template-rows: 100px 42.5px;
   grid-auto-flow:row;
   grid-auto-rows: max-content;
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
 width: 2em;
 height: 2em;
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
    let listArr = ["Lijst", "Index", "Dag", "Week"]


    const [srchContext, setSrchContext] = useState("");
    const changeSrchCtx = useCallback(value => { setSrchContext(value) }, [setSrchContext])
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

    return (
        <Layout>
            <Redirect exact from='/' to='/dashboard/' />
            {userData.tutorial === true || <Redirect exact from='/dashboard' to='/dashboard/tutorial' />}
            <ThemeProvider theme={sizeStyle}>

                <Route path={["/:base/add/:float1/:float2/", "/:base/add/:float1/", "/:base/add/"]} render={route =>
                    <FloatWindowDefault title={"Nieuwe activiteit"} route={route}><EditForm /></FloatWindowDefault>
                } />
                <Route path={["/:base/add/test/:float1/:float2/", "/:base/add/test/:float1/", "/:base/add/test/"]} render={route =>
                    <FloatWindowDefault title={"test"} route={route}><div></div></FloatWindowDefault>
                } />
                <Route path={["/:base/tutorial"]} render={route => <FloatWindowDefault header={{ colortag: "primaryBGC", border: false }} title={""} left={{ title: null }} right={{ title: null }} route={route}><div></div></FloatWindowDefault>} />
                <Route path={["/:base/profile/:float1/:float2/", "/:base/profile/:float1/", "/:base/profile/"]} render={route =>
                    <FloatWindowDefault left={{ title: null }} right={{ title: "Gereed" }} title={"Profiel"} route={route}>
                        <Profile settings={setAppSettings} route={route} user={userData} />
                    </FloatWindowDefault>
                } />


                <Route path={["/:sec/edit", "/:sec/card"]} render={route => <FloatWindowDefault right={{ title: "Wijzig", link: "./edit" }} title={"Details afspraak"} route={route} >
                    <Route path={["/:sec/edit"]} render={_ => <EditForm user={userData} userData={newsData} />} />
                    <Route path={["/:sec/card"]} render={_ => <CardForm user={userData} userData={newsData} />} />
                </FloatWindowDefault>} />

                {/* Menubar */}
                <Route path={"/:active"} render={route => <MenuBar route={route} />}></Route>

                {/* Explore */}
                <Route path={["/explore/:float1/:float2/", "/explore/:float1/", "/explore/"]} render={route => <Explore route={route} />}></Route>


                <ViewContext.Provider value={providerView}>
                    <SelectContext.Provider value={providerSelect}>
                        <DateContext.Provider value={providerDate}>
                            <Route path={["/view/:float1/:float2/", "/view/:float1/", "/view/"]} render={route => <Agenda source={sources} listArr={listArr} startingPoint={startPoint} view={view} source={select.id} route={route} />}></Route>
                            <Route path={["/view/"]} render={route => <ViewSize listArr={listArr} />}></Route>
                        </DateContext.Provider>
                    </SelectContext.Provider>
                </ViewContext.Provider>

                <Route path={["/dashboard/:float1/:float2/", "/dashboard/:float1/", "/dashboard"]} render={({ match: { params } }) =>
                    <Dashboard className={["pannel", "returnPannel", "nonePannel"][Object.values(params).length]}>
                        {/* //Header */}
                        <PageTitle>Overzicht</PageTitle>
                        <ProfilePic to="profile" img={`url("data:image/jpeg;base64,${userData ? userData.picture : null}")`} />
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
                    </Dashboard>
                } />


            </ThemeProvider>
        </Layout>
    );
});

export default MobileApp;
