import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Section = styled.section`
    grid-row: 2;
    grid-column: 2;
    padding: 15px;
    // height: calc(100% - 30px);
    // width: calc(100% - 30px);
    display: flex;
    flex-flow: row wrap;
    place-content:flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden auto;
`
const Project = styled(Link)`
    position: relative;
    display: grid;
    width: calc(100% - 20px);
    max-width: 200px;
    min-width: 120px;
    height: 100px;
    padding: 10px;
    flex-grow: 2;
    border-radius: 10px;
    margin-right: 15px;
    margin-bottom: 15px;
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

const Title = styled.h1`
    grid-row:1/3;
    grid-column:1;
    margin:0;
    justify-self:start;
    align-self:start;
    color: ${props => props.theme.primaryFC};
    ${Project}:hover & {
        color: #fff;
    }
`
const Arrow = styled.svg`
    grid-row:1;
    grid-column:2;
    justify-self:center;
    align-self:center;
    transform: scale(-1);
    fill: ${props => props.theme.primaryFC};
    width: 22px;
    height:15px;
    ${Project}:hover & {
        fill: #fff;
    }
`
const Stats = styled.div`
    grid-row:3;
    grid-column:1/3;
    display: grid;
    grid-template-rows: 1fr;
    grid-auto-columns: max-content;
    // grid-gap: 10px;
    grid-auto-flow: column;
`
const Icon = styled.svg`
    background: ${props => props.bg || "#121212"};
    fill:#fff;
    border-radius: 25px;
    height: 15px;
    width: 15px;
    justify-self:center;
    align-self:center;
    padding: 5px;
    ${Project}:hover & {
        background: #fff;
        fill: ${props => props.bg || "#121212"};
    }
    `
const Numbers = styled.h4`
    margin:0;
    justify-self:start;
    margin-right: 10px;
    margin-left: 5px;
    align-self:center;
    color: ${props => props.theme.primaryFC}
    ${Project}:hover & {
        color: #fff;
    }
`

//icon paths
const arrow = <path d="M420.361,192.229c-1.83-0.297-3.682-0.434-5.535-0.41H99.305l6.88-3.2c6.725-3.183,12.843-7.515,18.08-12.8l88.48-88.48    c11.653-11.124,13.611-29.019,4.64-42.4c-10.441-14.259-30.464-17.355-44.724-6.914c-1.152,0.844-2.247,1.764-3.276,2.754    l-160,160C-3.119,213.269-3.13,233.53,9.36,246.034c0.008,0.008,0.017,0.017,0.025,0.025l160,160    c12.514,12.479,32.775,12.451,45.255-0.063c0.982-0.985,1.899-2.033,2.745-3.137c8.971-13.381,7.013-31.276-4.64-42.4    l-88.32-88.64c-4.695-4.7-10.093-8.641-16-11.68l-9.6-4.32h314.24c16.347,0.607,30.689-10.812,33.76-26.88    C449.654,211.494,437.806,195.059,420.361,192.229z" />
const clock = <path xmlns="http://www.w3.org/2000/svg" d="m437.02 74.98c-48.353-48.351-112.64-74.98-181.02-74.98s-132.667 26.629-181.02 74.98c-48.351 48.353-74.98 112.64-74.98 181.02s26.629 132.667 74.98 181.02c48.353 48.351 112.64 74.98 181.02 74.98s132.667-26.629 181.02-74.98c48.351-48.353 74.98-112.64 74.98-181.02s-26.629-132.667-74.98-181.02zm34.96 166.02v30h-40.032v-30zm-351.001-98.808-28.307-28.307 21.213-21.213 28.307 28.307zm21.213 248.829-28.307 28.307-21.213-21.213 28.307-28.307zm219.7-150.021v30h-120.892v-120.892h30v90.892zm-90.892-160.948h-30v-40.032h30zm-30 351.896h30v40.032h-30zm128.808-40.927 21.213-21.213 28.307 28.307-21.213 21.213zm21.213-248.829-21.213-21.213 28.307-28.307 21.213 21.213zm-310.969 98.808v30h-40.032v-30z" />
const user = <g>
    <path d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0" /><path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0" />
</g>

//colors
const data = [{ theme: "#1377FF", title: "We Make Films", link: "b8XrJ4sdnycgb8VdvP4p", userCount: 5, foreseeableTasks: 31 },
{ theme: "#ff9500", title: "Gamers.com", link: "salfkjeflkj3334", userCount: 10, foreseeableTasks: 2 },
{ theme: "#FF480F", title: "Nevobo", link: "aflisj334", userCount: 50, foreseeableTasks: 8 },]


const getUserProjects = firebase.functions().httpsCallable('getUserProjects');
const cache = (uid) => JSON.parse(localStorage.getItem(`${uid}_userProjects`)) || [];
// const uid = firebase.auth().currentUser.uid;

const ProjectWindow = React.memo(({ route, user: { uid } }) => {
    const [projects, setProjects] = useState(cache(uid))
    useEffect(() => {
        getUserProjects({})
            .then(({ data }) => {
                setProjects(data)
                localStorage.setItem(`${uid}_userProjects`, JSON.stringify(data));
                return true;
            });
    }, [route])

    return <Section>
        {projects.map(prj => <Project key={`${prj.link}_${prj.title}`} bg={prj.theme} to={prj.id}>
            <Title>{prj.title}</Title>
            <Arrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 447.243 447.243" >{arrow}</Arrow>
            <Stats>
                <Icon bg={prj.theme} xmlns="http://www.w3.org/2000/svg" viewBox="-42 0 512 512.002">{user}</Icon>
                <Numbers>x{prj.membersLength}</Numbers>
                {/* <Icon bg={prj.theme} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{clock}</Icon> */}
                {/* <Numbers>x{prj.foreseeableTasks}</Numbers> */}
            </Stats>
        </Project>)}

        {/* <Add to={"add"}>
            <Title>Maak een nieuw project</Title>
            <Arrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 447.243 447.243" >{arrow}</Arrow>
        </Add> */}


    </Section >
})
export default ProjectWindow;