import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";

// const getActivitiesForDate = firebase.functions().httpsCallable('getActivitiesForDate');
// const cache = (uid, date) => JSON.parse(localStorage.getItem(`${uid}_activitiesForDate`)) || [];

const Section = styled.div`
    grid-column:1;
    display:grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: 1fr;
    height: 75px;
    justify-self:stretch;
    grid-gap: 10px;
    margin-top: 15px;
`

const Project = styled(Link)`
    position: relative;
    display: grid;
    justify-self:stretch;
    align-self:stretch;
    padding:10px;
    flex-grow: 2;
    border-radius: 10px;
    background: ${props => props.theme.secondaryBGC};
    grid-template-rows: 25px 1fr 25px;
    grid-template-columns: 1fr 25px;


    transition: transform 50ms ease-in-out;
    &:hover,  &:active{
        transform: scale(0.99);
        background: ${props => props.bg || "#121212"};
    }
`
const Add = styled(Project)`
    background: ${props => props.theme.menuIC}66;

    &:hover,  &:active{
    transform: scale(0.99);
    background: ${props => props.theme.menuIC}da;
}
`

const Title = styled.h4`
    grid-row:3;
    grid-column:1/3;
    margin:0;
    justify-self:start;
    align-self:end;
    color: ${props => props.theme.gray1};
    -webkit-text-fill-color:${props => props.theme.gray1};
    ${Project}:hover & {
        color: #fff;
        -webkit-text-fill-color: #fff;
    }
`
const Stats = styled.div`
    grid-row:1;
    grid-column:1/3;
    display: grid;
    grid-template-rows: 1fr;
    grid-auto-columns: 1fr 1fr;
    // grid-gap: 10px;
    grid-auto-flow: column;
`
const Icon = styled.svg`
    background: ${props => props.bg || "#121212"};
    fill:#fff;
    border-radius: 25px;
    height: 17.5px;
    width: 17.5px;
    justify-self:start;
    align-self:start;
    padding: 5px;
    ${Project}:hover & {
        background: #fff;
        fill: ${props => props.bg || "#121212"};
    }
    `
const Numbers = styled.h2`
    margin:0;
    grid-column:2;
    line-height: 1;
    justify-self:end;
    margin-right: 10px;
    margin-left: 5px;
    align-self:start;
    color: ${props => props.theme.hueReverse}
    -webkit-text-fill-color:${props => props.theme.hueReverse};
    ${Project}:hover & {
        color: #fff;
        -webkit-text-fill-color: #fff;
    }
`
const clock = <path xmlns="http://www.w3.org/2000/svg" d="m437.02 74.98c-48.353-48.351-112.64-74.98-181.02-74.98s-132.667 26.629-181.02 74.98c-48.351 48.353-74.98 112.64-74.98 181.02s26.629 132.667 74.98 181.02c48.353 48.351 112.64 74.98 181.02 74.98s132.667-26.629 181.02-74.98c48.351-48.353 74.98-112.64 74.98-181.02s-26.629-132.667-74.98-181.02zm34.96 166.02v30h-40.032v-30zm-351.001-98.808-28.307-28.307 21.213-21.213 28.307 28.307zm21.213 248.829-28.307 28.307-21.213-21.213 28.307-28.307zm219.7-150.021v30h-120.892v-120.892h30v90.892zm-90.892-160.948h-30v-40.032h30zm-30 351.896h30v40.032h-30zm128.808-40.927 21.213-21.213 28.307 28.307-21.213 21.213zm21.213-248.829-21.213-21.213 28.307-28.307 21.213 21.213zm-310.969 98.808v30h-40.032v-30z" />


const TasksOverView = React.memo(({ date, user: { uid } }) => {
    // const [activities, setActivities] = useState(cache(uid, date))
    // useEffect(() => {
    //     getActivitiesForDate({ date })
    //         .then(({ data }) => {
    //             setActivities(data)
    //             localStorage.setItem(`${uid}_activitiesForDate`, JSON.stringify(data));
    //             return true;
    //         }).catch(err => { return true });
    // }, [date])

    return <Section>
        <Project key={1} bg={"#1377FF"} to={location => location}>
            <Title>Vandaag</Title>
            <Stats>
                <Icon bg={"#1377FF"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{clock}</Icon>
                <Numbers>0</Numbers>
            </Stats>
        </Project>
        <Project key={2} bg={"#ff9f0a"} to={location => location}>
            <Title>Alle</Title>
            <Stats>
                <Icon bg={"#ff9f0a"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{clock}</Icon>
                <Numbers>7</Numbers>
            </Stats>
        </Project>
    </Section>
})
export default TasksOverView;