import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";

const cache = (uid) => JSON.parse(localStorage.getItem(`${uid}_historyDashboard`)) || [];

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
grid-template-rows: 1fr 25px;
height: 55px;
border-bottom: 1px #b7b7b766 solid;


&:last-child{
    margin-top: 10px;
    height: 45px;
    border-radius: 10px;
    border:none;
}
&:last-child p{
    color: ${props => props.theme.blue};
    -webkit-text-fill-color: ${props => props.theme.blue};
    font-weight: 400;
    grid-row: 1/3;
    align-self:center;
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
&:active p {
    color: #fff;
    -webkit-text-fill-color: #fff;
}
&:active{
    background: ${props => props.theme.tertiaryBGC};
    transition: transform 50ms ease-in-out;
}
`
const Title = styled.p`
margin: 0;
font-weight:600;
font-weight: 500;
padding: 0;
color: ${props => props.theme.hueReverse};
-webkit-text-fill-color: ${props => props.theme.hueReverse};
font-size: 1em;
text-align: left;
justify-self: start;
align-self: end;
`

const By = styled.p`
margin:0;
padding:0;
  grid-column:1/3;
  grid-row:2;
  font-size: ${props => props.theme.subFontSize};
  font-weight: 500;
  justify-self:start;
  align-self: start;
  color: ${props => props.theme.gray1};
  -webkit-text-fill-color:${props => props.theme.gray1};
`
const Arrow = styled.svg`
fill: #b7b7b7;
justify-self: end;
align-self: center;
grid-column:3;
grid-row: 1/3;
height: 12.5px;
`
const arrow = <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z" />


const History = React.memo(({ user: { uid } }) => {
  const db = firebase.firestore();
  const [history, setHistory] = useState(cache(uid))

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .collection("history")
      .orderBy("timestamp", "desc")
      .limit(3)
      .get()
      .then(snap => {
        setHistory([]);
        snap.forEach(doc => setHistory(arr => [...arr, { ...doc.data(), id: doc.id }]))
      })
      .catch(err => console.log("unable to fetch history", err))
  }, [uid])
  localStorage.setItem(`${uid}_historyDashboard`, JSON.stringify(history));

  return (
    <Section>
      {history[0] && history.map((doc, i) =>
        <Container to={{ pathname: "historyevent/", state: doc }} key={i}>
          <Title >{doc.name}</Title>
          <By >{`${new Date(doc.timestamp).getDate()}-${new Date(doc.timestamp).getMonth()}-${new Date(doc.timestamp).getFullYear()}`}</By>
        </Container>
      )}
      {/* See all */}
      <Container to="/history/" key="seehistory">
        <Title>Toon alle gebeurtenissen</Title>
        <Arrow viewBox="0 0 451.846 451.847" xmlns="http://www.w3.org/2000/svg">{arrow}</Arrow>
      </Container>
    </Section>
  );
})

export default History;
