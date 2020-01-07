import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";

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
const LinkBase = styled(Link)`
    display: flex;
    flex-flow: row;
    width: calc(90% - 15px);
    background: ${props => props.theme.secondaryBGC || "#fafafa"};
    padding: 7.5px 7.5px;
    margin-bottom: 10px;
    border-radius: 8px;
    height: 22.5px;
    &:hover{
      transform: scale(0.99);
      transition: transform 150ms ease-in-out;
    }
    &:focus{
      transform: scale(0.95);
      transition: transform 150ms ease-in-out;
    }
`
const Text = styled.div`
    font-size: ${props => props.theme.defaultFontSize};
    font-weight: 600;
    justify-self: start;
    align-self: center;
    color: #b7b7b7;
    -webkit-text-fill-color: #b7b7b7;
    &:hover{
        color: #b7b7b7;
        -webkit-text-fill-color: #b7b7b7;
        transition: all 50ms ease-in-out;
    }
`
const SearchFeed = ({ srchCntx, changeSrchCtx }) => {

  return (
    <Container>
      {/* <LinkBase>
        <Text>"{srchCntx}"</Text>
      </LinkBase> */}
      <LinkBase to="add">
        <Text>Maak afspraak</Text>
      </LinkBase>
      {/* <LinkBase>
        <Text>Maak kalendar</Text>
      </LinkBase> */}
    </Container>
  );
}

export default SearchFeed;
