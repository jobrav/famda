import React, { useEffect, useState } from "react";
import ExploreCalendars from "../exploreCalendars";
import styled from "styled-components"

const Container = styled.div`
position: relative;
  padding-top: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top: ${props => props.theme.secondaryBGC || "#f3f3f3"} 1px solid;
  border-left: ${props => props.theme.secondaryBGC || "#f3f3f3"} 1px solid;
  grid-row: 2;
  width: 20vw;
  z-index: 5;
  backdrop-filter: blur(25px);
  min-width: 225px;
  grid-column: 3;
  background: ${props => props.theme.floatBGC || "#f7f7f7da"};
`
const LinkBase = styled.a`
    display: flex;
    flex-flow: row;
    width: calc(90% - 15px);
    background:  ${props => props.theme.secondaryBGC || "#f3f3f3"};
    padding: 7.5px 7.5px;
    margin-bottom: 10px;
    border-radius: 8px;
    height: 22.5px;
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
const SearchFeed = ({ srchCntx }) => {
  return (
    <Container>
      <LinkBase>
        <Text>"{srchCntx}"</Text>
      </LinkBase>
      <LinkBase>
        <Text>Maak afspraak</Text>
      </LinkBase>
      <LinkBase>
        <Text>Maak kalendar</Text>
      </LinkBase>
    </Container>
  );
}

export default SearchFeed;
