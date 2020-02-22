import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom";
import * as firebase from "firebase";

const Section = styled.section`
height: 100%;
padding: 0 20px;
width: calc(100% - 40px);
max-width: 620px;
`
const Container = styled.div`
    height: 100%;
    width: 100%;
    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr 100px;
`
const Text = styled.h1`
    margin:0;
    padding:0;
    color: ${props => props.theme.primaryFC};
    -webkit-text-fill-color: ${props => props.theme.primaryFC};
    text-align:left;
    `
const Title = styled(Text)`
    text-align:center;
    font-size: 2em;
    grid-column:1;
    grid-row:1;
    justify-self:center;
    align-self:end;
`
const Caption = styled(Text)`
    text-align:left;
    font-size: 1em;
    justify-self:center;
    align-self:end;
    color: ${({ theme: { darkMode, gray1, hueReverse } }) => darkMode ? gray1 : hueReverse};
    -webkit-text-fill-color: ${({ theme: { darkMode, gray1, hueReverse } }) => darkMode ? gray1 : hueReverse};
`
const Button = styled.button`
all: unset;
grid-row: 3;
width: 100%;
grid-column:1;
justify-self: center;
align-self: start;
font-weight: 500;
cursor:pointer;
color:#fff;
text-align:center;
padding: 12.5px 0;
background: ${props => props.theme.blue};
border-radius: 15px;

font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
sans-serif;
`
const FinshBtn = styled(Link)`
all: unset;
grid-row: 3;
width: 100%;
grid-column:1;
justify-self: center;
align-self: start;
font-weight: 500;
cursor:pointer;
color:#fff;
-webkit-text-fill-color:#fff;
text-align:center;
padding: 12.5px 0;
background: ${props => props.theme.blue};
border-radius: 15px;

font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
sans-serif;
`
const ListContainer = styled.div`
    margin-top: 15px
    padding-left: 20px;
    justify-self:stretch;
    align-self:start;
    grid-column:1;
    grid-row:2;
    height:auto;
    display:grid;
    grid-auto-flow:row;
    grid-auto-rows: max-content;
    border-radius: 10px;
    overflow:hidden;
    background: ${({ theme: { darkMode, hue, gray6 } }) => darkMode ? gray6 : hue};
`
const ListItem = styled.div`
    justify-self:stretch;
    padding-right:10px;
    width: calc(100% - 10px);
    display: grid;
    grid-template-columns: repeat(2,max-content) 1fr;
    grid-template-rows: 1fr;
    height: 55px;
    border-bottom: 1px #b7b7b766 solid;

    &:last-child{
        border:none;
    }
    &:hover,active{
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

const Tutorial = ({ }) => {
    const [stage, setStage] = useState('welcome')
    return <Section>
        {stage == 'welcome' && <Welcome stage={setStage} />}
        {stage == 'interface' && <Interface stage={setStage} />}
        {stage == 'agenda' && <AgendaView stage={setStage} />}
        {stage == 'finish' && <Finsh stage={setStage} />}
    </Section>
}
export default Tutorial;

const Welcome = ({ stage }) => {

    return <Container>
        <Title>Welkom bij <br></br> Famda de app</Title>
        <Button onClick={() => stage('interface')}>Starten</Button>
    </Container>
}
const Interface = ({ stage }) => {

    return <Container>
        <Title>Kies een 'openingsscherm'</Title>

        <ListContainer>
            {[{ title: "Overzicht", link: "dashboard" }, { title: "Agenda", link: "view" }].map(({ title, link }, i) =>
                <ListItem onClick={() => localStorage.setItem('startScreen', link)} key={i}>
                    <Name>{title}</Name>
                </ListItem>)}
        </ListContainer>

        <Button onClick={() => stage('agenda')}>Kiezen</Button>
    </Container>
}
const AgendaView = ({ stage }) => {

    return <Container>
        <Title>AgendaView</Title>

        <ListContainer>
            {[{ title: "Lijst", link: "list" }, { title: "Index", link: "swipelist" }].map(({ title, link }, i) =>
                <ListItem onClick={() => localStorage.setItem('startView', link)} key={i}>
                    <Name>{title}</Name>
                </ListItem>)}
        </ListContainer>

        <Button onClick={() => stage('finish')}>Kiezen</Button>
    </Container>
}
const Finsh = ({ }) => {

    let finishTutorial = firebase.functions().httpsCallable("finishTutorial");
    const send = () => {
        finishTutorial({ startScreen: localStorage.getItem('startScreen'), startView: localStorage.getItem('startView') })
            .then(e => {
                console.log("Tutorial Finsished!", e);
            })
    }
    return <Container>
        <Title>Klaar!</Title>
        <FinshBtn onClick={send} to={`/${localStorage.getItem('startScreen') || "dashboard"}`}>Voltooien</FinshBtn>
    </Container>
}