import React from "react";
import { ReactComponent as Icon } from "./search.svg";
import { ReactComponent as Close } from "./close.svg";
import styled from "styled-components";
import "./style.css";

const Container = styled.div`
border-radius: 5px;
display: grid;
grid-row: 1;
grid-column: 2/4;
grid-template-columns: 30px auto 30px;
height: 100%;
background: ${props => props.theme.secondaryBGC || "#f7f7f7"};
`
const Text = styled.input`
all: unset;
font-size: ${props => props.theme.defaultFontSize};
grid-column: 2;
height: 100%;
font-weight: 300;
color: ${props => props.theme.primaryFC || "#121212"};
-webkit-text-fill-color: ${props => props.theme.primaryFC || "#121212"};
&:placeholder {
  color:  ${props => props.theme.primaryFC || "#121212"};
  -webkit-text-fill-color:  ${props => props.theme.primaryFC || "#121212"};
}
`

const SearchBar = React.memo(({ srchCtx, changeSrchCtx }) => {
  const clear = e => {
    e.currentTarget.previousSibling.value = ""
    changeSrchCtx("")
  }
  return (
    <div id="searchBar">
      <Container>
        <Icon id="searchIcon" />
        <Text
          type="text"
          placeholder="Zoeken"
          onChange={e => changeSrchCtx(e.currentTarget.value)}
        />
        {srchCtx ? <Close id="cancelIcon" onClick={clear} /> : null}
      </Container>
    </div>
  );
})
export default SearchBar
