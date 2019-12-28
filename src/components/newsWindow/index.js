import React, { useEffect, useState } from "react";
import FinishProfile from "../finishProfile";
import Invites from "../invites";
import styled from "styled-components";

const Section = styled.section`
position: relative;
padding-top: 15px;
display: flex;
align-items: center;
flex-direction: column;
border-top: ${props => props.theme.secondaryBGC || "#f3f3f3"} 1px solid;
border-left: ${props => props.theme.secondaryBGC || "#f3f3f3"} 1px solid;
grid-column: 3;
grid-row: 2;
width: 20vw;
max-width: 275px;
min-width: 225px;
height: 100%;
overflow: auto;
background: ${props => props.theme.primaryBGC || "#fff"};

& > :last-child {
  margin-bottom: 75px;
}
`
const Head = styled.div`
    margin: 5px 0;
    padding: 0 15px;
    font-weight: 800;
    font-size: 13.5px;
    color: ${props => props.theme.primaryFC || "#121212da"};
    align-self: start;
`
const Icon = styled.div`
    height: 22.5px;
    width: 22.5px;
    margin-right: 7.5px;
    border-radius: 25px;
    background: #007aff;
`
const Text = styled.div`
    font-size: 12.5px;
    color: #727272;
    font-weight: 600;
    justify-self: start;
    align-self: center;
    color: #b7b7b7;
    &:hover{
        color: #b7b7b7;
        transition: all 50ms ease-in-out;
    }
`
const LinkBase = styled.a`
    display: flex;
    flex-flow: row;
    width: calc(90% - 15px);
    background:  ${props => props.theme.secondaryBGC || "#f3f3f3"};
    padding: 7.5px 7.5px;
    margin-bottom: 10px;
    border-radius: 8px;
`
const Link = styled(LinkBase)` 
padding-left: ${props => props.active ? "calc(10% + 7.5px) !important" : null};
background: ${props => props.active ? props.theme.secondaryBGC || "#f3f3f3 !important" : null};
border-radius: ${props => props.active ? "0 !important" : null};
transition: all 50ms ease-in-out;
`
const Image = styled.img` 
display: flex;
flex-flow: row;
width: calc(90% - 15px);
background:  ${props => props.theme.secondaryBGC || "#f3f3f3"};
padding: 7.5px 7.5px;
margin-bottom: 10px;
border-radius: 8px;
`

const News = React.memo(({ user, userData, reminders }) => {

  let profileFinished = user ? user.profileFinished : true;
  let invites = (userData && userData.invites) || false;
  let hasInvites = invites.invites && userData.invites.invites.length >= 1;

  return (
    <Section>
      <Head>Volgende activiteit</Head>
      <Link>
        <Icon className="icon" />
        <Text>Deadline Nederlands PO3</Text>
      </Link>

      {profileFinished || <FinishProfile />}
      {hasInvites ? <Invites input={userData && invites} /> : <div />}

      <Image src="https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"></Image>
      <Head>Recent gebruikt</Head>
      <Link>
        <Icon className="icon" />
        <Text>MLA Rooster</Text>
      </Link>
      <Link>
        <Icon className="icon" />
        <Text>Visvalk</Text>
      </Link>
      <Link>
        <Icon className="icon" />
        <div className="number">9</div>
        <Text>Alle</Text>
      </Link>

    </Section>
  );
})

export default News;
