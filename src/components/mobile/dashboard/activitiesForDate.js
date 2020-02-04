import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";

const getActivitiesForDate = firebase.functions().httpsCallable('getActivitiesForDate');
const cache = (uid, date) => JSON.parse(localStorage.getItem(`${uid}_activitiesForDate`)) || [];

const Section = styled.div`
    grid-column:1;
    display:grid;
    grid-auto-flow:row;
    grid-auto-rows: max-content;
`
const Container = styled(Link)`
justify-self:stretch;
background: ${props => props.theme.secondaryBGC};
padding-left:20px;
padding-right:10px;
width: calc(100% - 30px);
display: grid;
grid-template-columns: repeat(2,max-content) 1fr;
grid-template-rows: 1fr;
height: 50px;
border-bottom: 1px #b7b7b766 solid;


&:last-child{
    margin-top: 10px;
    height: 40px;
    border-radius: 10px;
    border:none;
}
&:hover p {
    color: #fff;
    -webkit-text-fill-color: #fff;
}
&:last-child p{
    color: ${props => props.theme.blue};
    -webkit-text-fill-color: ${props => props.theme.blue};
    font-weight: 400;
}

&:first-child{
    border-top-left-radius:10px;
    border-top-right-radius:10px;
}
&:nth-last-child(2){
    border:none;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
&:hover{
    background: ${props => props.theme.tertiaryBGC};
    transition: transform 50ms ease-in-out;
}
`
const Name = styled.p`
margin: 0;
font-weight:600;
font-weight: 500;
padding: 0;
color: ${props => props.theme.hueReverse};
-webkit-text-fill-color: ${props => props.theme.hueReverse};
font-size: 1em;
text-align: left;
justify-self: start;
align-self: center;
`

const Time = styled(Name)`
justify-self: end;
align-self:center;
grid-column:3;
font-size: 0.75em;
font-weight:700;
color: ${props => props.theme.blue};;
-webkit-text-fill-color: ${props => props.theme.blue};
padding: 5px 10px;
border-radius: 15px;
background: ${({ theme: { darkmode, hue, gray6 } }) => darkmode ? hue : gray6};
margin-right: 10px;
`

const Arrow = styled.svg`
fill: #b7b7b7;
justify-self: end;
align-self: center;
grid-column:3;
height: 12.5px;
`
const arrow = <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z" />

const ActivitiesForDate = React.memo(({ date, user: { uid } }) => {
    const [activities, setActivities] = useState(cache(uid, date))
    useEffect(() => {
        getActivitiesForDate({ date })
            .then(({ data }) => {
                setActivities(data)
                localStorage.setItem(`${uid}_activitiesForDate`, JSON.stringify(data));
                return true;
            }).catch(err => { return true });
    }, [date])

    return <Section>
        {activities[0] && activities.map((e, i) => <Container to={{ pathname: "card", state: e }} key={i}>
            {/* <Theme color={e.theme} /> */}
            <Name>{e.title}</Name>
            <Time color={e.theme}>{`${e.time.start[0]}:${e.time.start[1]}${e.time.start[1] < 10 && '0'}`}</Time>
        </Container>)}
        {/* See all */}
        <Container to="/view" key="seeallactivities">
            <Name>Toon alle activiteiten</Name>
            <Arrow viewBox="0 0 451.846 451.847" xmlns="http://www.w3.org/2000/svg">{arrow}</Arrow>
        </Container>
    </Section>
})
export default ActivitiesForDate;