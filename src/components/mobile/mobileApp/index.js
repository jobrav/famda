// import React from "react";
import * as firebase from "firebase";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
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
width: 100vw;
height: 100vh;
overflow: hidden;
background: ${props => props.theme.primaryBGC || "white"};
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 50px 1fr 50px;
`
const Text = styled.div`
cursor: ${props => props.select ? "text" : "default"};
align-self: ${props => props.align || "none"};
justify-self: ${props => props.justify || "none"};
font-weight: ${props => props.bold ? "600" : "300"};
color: ${props => props.theme.primaryFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.primaryFC || "#272727"};
`


const sizeStyle = {
    titleFontSize: "20px",
    defaultFontSize: "16.5px",
    subFontSize: "10.5px",
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

                <Route path={["/:sec/add"]} render={route =>
                    <FloatWindowDefault title={"Nieuwe activiteit"} route={route}><EditForm /></FloatWindowDefault>
                } />
                <Route path={["/:sec/card"]} render={route =>
                    <FloatWindowDefault title={"Activiteit"} route={route}><div></div></FloatWindowDefault>
                } />
                <Route path={["/docs/", "/view/", "/profile/"]} render={route => <MenuBar route={route} />}></Route>


                <ViewContext.Provider value={providerView}>
                    <SelectContext.Provider value={providerSelect}>
                        <DateContext.Provider value={providerDate}>
                            <Route path={["/view/"]} render={route => <Agenda source={sources} listArr={listArr} startingPoint={startPoint} view={view} source={select.id} route={route} />}></Route>
                            <Route path={["/view/"]} render={route => <ViewSize listArr={listArr} />}></Route>
                        </DateContext.Provider>
                    </SelectContext.Provider>
                </ViewContext.Provider>


            </ThemeProvider>
        </Layout>
    );
});

export default MobileApp;
