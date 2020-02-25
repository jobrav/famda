import React, { useEffect, useContext } from "react";
import styled from "styled-components"
import TasksOverView from "./components/tasks"
import Invites from "./components/invites"
import ActivitiesForDate from "./components/activitiesForDate"
import History from "./components/history"


const Section = styled.section`
border-top:  ${props => props.theme.secondaryBGC || "#f3f3f3"} 1px solid;
display: grid;
overflow-x: auto;
overflow-y: hidden;
grid-auto-flow: column;
grid-auto-columns: 1fr;
grid-template-rows: repeat(4,max-content);
column-gap: 15px;
align-self:stretch;
justify-self:stretch;
grid-column: 2/4;
grid-row: 2;
padding: 0 15px;
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
justify-self: start;
align-self: end;`

const Dashboard = React.memo(({ user, userData }) => {


    return (
        <Section>


            {/* Invites */}
            {/* <SubTitle>Uitnodigingen</SubTitle>
            <Invites user={user} /> */}

            {/* Todays apointments */}
            <SubTitle>Afspraken</SubTitle>
            <ActivitiesForDate user={user} date={new Date().setHours(0, 0, 0, 0)} />

            {/* Updates */}
            <SubTitle>Te doen</SubTitle>
            <TasksOverView user={userData} date={new Date().setHours(0, 0, 0, 0)} />


            {/* History */}
            <SubTitle>Geschiedenis</SubTitle>
            <History user={user} />

        </Section>
    );
})

export default Dashboard;
