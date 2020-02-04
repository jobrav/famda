import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Section = styled.section`
    grid-row: 2;
    grid-column: 2;
    padding: 15px;
    height: calc(100% - 30px);
    width: calc(100% - 30px);
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden auto;
`

//colors
// const data = [{ theme: "#1377FF", title: "We Make Films", link: "lskfajeljksje34", userCount: 5, foreseeableTasks: 31 },
// { theme: "#ff9500", title: "Gamers.com", link: "salfkjeflkj3334", userCount: 10, foreseeableTasks: 2 },
// { theme: "#FF480F", title: "Nevobo", link: "aflisj334", userCount: 50, foreseeableTasks: 8 },]


const getProjects = firebase.functions().httpsCallable('getProjects');
const cache = (uid, params) => JSON.parse(localStorage.getItem(`${uid}_${params}_projectlist`)) || [];
// const uid = firebase.auth().currentUser.uid; // uid

const ProjectList = React.memo(({ route: { match: { params } }, user: { uid } }) => {

    const [projects, setProjects] = useState(cache(uid, params))
    useEffect(() => {
        getProjects({ parent: params.id, calId: 'b8XrJ4sdnycgb8VdvP4p' })
            .then(({ data }) => {
                setProjects(data);
                localStorage.setItem(`${uid}_${params}_projectlist`, JSON.stringify(data));
                return true;
            });
    }, [params])


    return <Section>
        {projects.map(project => <div key={project.id}>{project.title || "undefined"}</div>)}
    </Section >
})
export default ProjectList;