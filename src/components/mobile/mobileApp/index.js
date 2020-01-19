// import React from "react";
import * as firebase from "firebase";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components"
//context
import { ViewContext, SelectContext, DateContext, ShowContext, DocRefContext } from "../../../contexts"
// controlers
import MenuBar from "../menuBar";

// Floating windows
import FloatWindowDefault from "../floatWindow";
// Floatwindow items
import EditForm from "../editForm";
// app windows
import ViewSize from "../viewSize";
// app windowsagendaWindow
import Agenda from "../agendaWindow";


let groupSources = [];

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
background: ${props => props.theme.primaryBGC || "white"};
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 50px 1fr 50px;
`

const sizeStyle = {
    titleFontSize: "20px",
    defaultFontSize: "16.5px",
    subFontSize: "10.5px",
    menuFontSize: "9px",
}

const MobileApp = React.memo(({ setAppSettings, auth, userData, newsData, reminders, route }) => {

    let agendaSelects = userData ? userData.sources : {};
    let sources = userData ? userData.sources : [];
    // agenda array
    let listArr = ["Lijst", "Index", "Dag", "Week"]

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
            <Redirect exact from='/' to='/view/' />
            <ThemeProvider theme={sizeStyle}>

                <Route path={["/:base/add/:float1/:float2/", "/:base/add/:float1/", "/:base/add/"]} render={route =>
                    <FloatWindowDefault title={"Nieuwe activiteit"} route={route}><EditForm /></FloatWindowDefault>
                } />
                <Route path={["/:base/add/test/:float1/:float2/", "/:base/add/test/:float1/", "/:base/add/test/"]} render={route =>
                    <FloatWindowDefault title={"test"} route={route}><div></div></FloatWindowDefault>
                } />
                <Route path={["/:sec/card"]} render={route =>
                    <FloatWindowDefault title={"Activiteit"} route={route}><div></div></FloatWindowDefault>
                } />
                <Route path={["/docs/", "/view/", "/profile/"]} render={route => <MenuBar route={route} />}></Route>


                <ViewContext.Provider value={providerView}>
                    <SelectContext.Provider value={providerSelect}>
                        <DateContext.Provider value={providerDate}>
                            <Route path={["/view/:float1/:float2/", "/view/:float1/", "/view/"]} render={route => <Agenda source={sources} listArr={listArr} startingPoint={startPoint} view={view} source={select.id} route={route} />}></Route>
                            <Route path={["/view/"]} render={route => <ViewSize listArr={listArr} />}></Route>
                        </DateContext.Provider>
                    </SelectContext.Provider>
                </ViewContext.Provider>


            </ThemeProvider>
        </Layout>
    );
});

export default MobileApp;
