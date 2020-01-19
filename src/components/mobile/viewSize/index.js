import React, { useContext } from "react";
import { ViewContext } from "../../../contexts"
import styled from "styled-components"

//styling 
const Nav = styled.div`
  position: fixed;
  bottom: 55px;
  left: 10px;
  margin-bottom: 2.5px;
  z-index: 10;
  border-radius: 40px;
  padding: 5px 0;
  width: calc(100vw - 20px);
  height: 30px
  background: ${props => props.theme.floatSecBGC || "#f3f3f3da"};
  backdrop-filter: blur(50px) contrast(1.5);
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
`
const Backdrop = styled.div`
  position: absolute;
  top: calc(10px / 2);
  z-index: -1;
  background: #b7b7b752;
  border-radius: 30px;
  height: calc(100% - 10px);
  width: calc(100% / 4 - 13px);
  margin: 0 1.5px;
  pointer-events: none;
  transition: all 0.25s ease-in-out;
`
const ListItem = styled.a`
  justify-self: center;
  align-self: center;
  font-size: ${props => props.theme.defaultFontSize};
  font-weight: 500;
  height: 21px;
  line-height: 21px;
  border-radius: 25px;
  color: #b7b7b7;
  -webkit-text-fill-color:  #b7b7b7da;
  max-width: 75px;
  width: calc(100vw / 4 - 10px);
  text-align: center;
  transition: all 0.1s ease-in-out;
  
  &:hover {
    color: ${props => props.theme.primaryFHC || "#b7b7b7"}da;
    -webkit-text-fill-color: ${props => props.theme.primaryFHC || "#b7b7b7"}da
    transition: all 0.1s ease-in-out;
  }
  
  ${props => props.active ? "color: #fff !important;" : null};
  ${props => props.active ? "-webkit-text-fill-color: #fff !important;" : null};
`;



const ViewSize = ({ listArr }) => {
  const { view, setView } = useContext(ViewContext)
  const index = () => listArr.findIndex(e => e === view);
  const moveActive = e => (100 / 4 + 0.25) * index() + 1;


  return (
    <Nav>
      <Backdrop style={{ left: `${moveActive()}%` }} />
      {listArr.map(elm => <ListItem key={elm} active={elm === view} onClick={() => setView(elm)}>{elm}</ListItem>)}
    </Nav >
  );
}

export default ViewSize;
