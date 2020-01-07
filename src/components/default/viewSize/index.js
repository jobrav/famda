import React, { useContext } from "react";
import { ViewContext } from "../../../contexts"
import styled from "styled-components"

//styling 
const Nav = styled.div`
  position: relative;
  border-radius: 25px;
  padding: 0 2px;
  height: 25px;
  background: ${props => props.theme.secondaryBGC || "#f3f3f3"};
  backdrop-filter: blur(2px);
  display: grid;
  justify-self: center;
  align-self: center;
  grid-auto-flow: column;
`
const Backdrop = styled.div`
  position: absolute;
  top: calc(4px / 2);
  z-index: -1;
  background: #b7b7b79a;
  border-radius: 25px;
  height: 21px;
  max-width: 75px;
  width: calc(100vw / 4 - 10px);
  pointer-events: none;
  transition: all 0.25s ease-in-out;
`
const ListItem = styled.a`
  justify-self: center;
  align-self: center;
  font-size: ${props => props.theme.defaultFontSize};
  font-weight: 600;
  height: 21px;
  line-height: 21px;
  border-radius: 25px;
  color: ${props => props.theme.primaryFC || "#b7b7b7"};
  -webkit-text-fill-color: ${props => props.theme.primaryFC || "#b7b7b7"};
  max-width: 75px;
  width: calc(100vw / 4 - 10px);
  text-align: center;
  transition: all 0.1s ease-in-out;
  
  &:hover {
    color: ${props => props.theme.primaryFHC || "#b7b7b7da"}
    -webkit-text-fill-color: ${props => props.theme.primaryFHC || "#b7b7b7da"}
    transition: all 0.1s ease-in-out;
  }
  
  ${props => props.active ? "color: #fff !important;" : null};
  ${props => props.active ? "-webkit-text-fill-color: #fff !important;" : null};
`;



const ViewSize = ({ listArr }) => {
  const { view, setView } = useContext(ViewContext)
  const index = () => listArr.findIndex(e => e === view);
  const moveActive = e => 2 + 75 * index()


  return (
    <Nav>
      <Backdrop className="viewActive" style={{ left: `${moveActive()}px` }} />
      {listArr.map(elm => <ListItem key={elm} active={elm === view} onClick={() => setView(elm)}>{elm}</ListItem>)}
    </Nav >
  );
}

export default ViewSize;
