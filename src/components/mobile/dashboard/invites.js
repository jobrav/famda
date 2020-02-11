import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import styled from "styled-components";

const Section = styled.div`
position:relative;
  width:100%;
  display:flex;
  flex-direction: column;
  align-items:center;
  cursor:pointer;
`
const Container = styled.div`
  width:calc(100% - 30px);
  display:grid;
  background: ${props => props.theme.secondaryBGC};
  border-radius: 7.5px;
  grid-template-rows: 40px 40px;
  grid-template-columns: 1fr max-content;
  padding-top:5px;
  transition:all 100ms ease-in-out;
  padding: 0 15px;

  &:active p {
    color: #fff;
    -webkit-text-fill-color: #fff;
}
&:active{
    background: ${props => props.theme.tertiaryBGC};
    transition: transform 50ms ease-in-out;
}
  
  // ${Section}:active &{
  //   transform-origin: bottom;
  //   transform:scale(0.99);
  //   background: ${props => props.theme.secondaryBGC}da;
  // }
  `
const ContainerAfter = styled.div`
  width:92.5%;
  height: 5px;
  display:grid;
  background: ${props => props.theme.secondaryBGC}99;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  transition:all 100ms ease-in-out;
  
  // ${Section}:active &{
  //   width:93%;
  //   height: 7px;
  //   border-bottom-left-radius: 5px;
  //   border-bottom-right-radius: 5px;
  // }
`
const Title = styled.p`
margin:0;
padding:0;
grid-column:1/3;
grid-row:1;
  font-size: ${props => props.theme.defaultFontSize};
  font-weight: 500;
  justify-self:start;
  align-self: end;
  color: ${props => props.theme.hueReverse};
  -webkit-text-fill-color: ${props => props.theme.hueReverse};
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

const ButtonAccept = styled.button`
  justify-self:end;
  align-self: center;
  margin:0;
  padding: 6px 10px;
  grid-row:1/3;
  grid-column:2;
  border:none;
  outline:none;
  border-radius: 25px;
  font-size: 0.75em;
  font-weight: 700;
  text-transform: uppercase;
  background: ${({ theme: { darkmode, hue, gray6 } }) => darkmode ? hue : gray6};
  color: ${props => props.theme.blue};
  -webkit-text-fill-color: ${props => props.theme.blue};
  text-align:center;
`

const Invites = React.memo(({ user: { uid } }) => {
  const db = firebase.firestore();
  const [invites, setInvites] = useState([])

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .collection("userData")
      .doc('invites')
      .get().then(snap => setInvites(snap.data().invites))
      .catch(err => console.log("unable to fetch invites", err))
  }, [uid])

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
  let { name, theme, by, timestamp } = invites[0] || {}
  return (
    <Section>
      <Container inviteTheme={theme}>
        <Title >{name}</Title>
        <By >{by}</By>
        <ButtonAccept onClick={() => accept(invites[0])} bold>Toevoegen</ButtonAccept>
        {/* <Button >Afwijzen</Button> */}
      </Container>
      {invites.length > 1 && <ContainerAfter inviteTheme={theme} />}
    </Section>
  );
})

export default Invites;
