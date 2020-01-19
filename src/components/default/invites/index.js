import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import styled from "styled-components";

const Section = styled.div`
position:relative;
  width:90%;
  display:flex;
  flex-direction: column;
  margin-bottom: 10px;
  align-items:center;
  cursor:pointer;
`
const Container = styled.div`
  width:100%;
  display:grid;
  background: ${props => props.inviteTheme || props.theme.menuIC};
  border-radius: 7.5px;
  grid-template-rows: 25px 25px 35px;
  grid-template-columns: 1fr 1fr;
  padding-top:5px;
  transition:all 100ms ease-in-out;
  
  ${Section}:active &{
    transform-origin: bottom;
    transform:scale(0.99);
    background: ${props => props.inviteTheme || props.theme.menuIC}da;
  }
  `
const ContainerAfter = styled.div`
  width:92.5%;
  height: 5px;
  display:grid;
  background: ${props => props.inviteTheme || props.theme.menuIC}66;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  transition:all 100ms ease-in-out;
  
  ${Section}:active &{
    width:93%;
    height: 7px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`
const Title = styled.div`
grid-column:1/3;
grid-row:1;
  font-size: ${props => props.theme.defaultFontSize};
  font-weight: 400;
  justify-self:start;
  align-self: end;
  padding-left: 15px;
  color: #fff;
  webkit-text-fill-color:#fff;
  `
const By = styled.div`
  grid-column:1/3;
  grid-row:2;
  font-size: ${props => props.theme.subFontSize};
  font-weight: 500;
  justify-self:start;
  align-self: start;
  padding-left: 15px;
  color: #ffffff9a;
  webkit-text-fill-color:#ffffff9a;
`
const Timestamp = styled.div`
grid-column:2;
grid-row:1;
  font-size: ${props => props.theme.subFontSize};
  font-weight: 400;
  justify-self:end;
  align-self: end;
  padding-right: 15px;
  color: #fff;
  webkit-text-fill-color:#fff;
`
const Button = styled.button`
  grid-row:3;
  border:none;
  outline:0;
  font-size: 11px;
  font-weight: ${props => props.bold ? "600" : "400"};
  justify-self:center;
  align-self: strt;
  background:transparent;
  cursor:pointer;
  margin:0;
  padding:0;
  color: #fff;
  webkit-text-fill-color:#fff;
  text-align:center;
  width:100%;
  border-top: #0000001c 1px solid;
`

function Invites(props) {
  const [invites, setInvites] = useState([{ name: "KVA H1", theme: "#FF480F", by: "Nevobo Noord-Holland", id: "fesfesf", timestamp: new Date().valueOf() }, { name: "Feest dagen", by: "Famda", id: "d2342", theme: "#34eba1", timestamp: new Date().valueOf() }])
  // useEffect(() => {
  //   let getInvites = firebase.functions().httpsCallable("getInvites");
  //   getInvites().then(data => setInvites(data))
  // }, [props])

  const accept = e => {
    if (e.ckey && e.cid) {
      let addSource = firebase.functions().httpsCallable("acceptInvite");
      addSource({ doc: e.data })
        .then(e => {
          console.log("added", e);
        })
        .catch(err => console.log(err));
    } else console.error("Missing keys")
  };
  let { name, theme, by, timestamp } = invites[0]
  return (
    <Section>
      <Container inviteTheme={theme}>
        <Title >{name}</Title>
        <By >{by}</By>
        <Timestamp>{`${new Date(timestamp).getDate()} Jan.`}</Timestamp>
        <Button >Afwijzen</Button>
        <Button onClick={() => accept(invites[0])} bold>Accepteren</Button>
      </Container>
      {invites.length > 1 && <ContainerAfter inviteTheme={theme} />}
    </Section>
  );
}

export default Invites;
