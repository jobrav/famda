import React, { useContext } from "react";
import { ViewContext } from "../../contexts"
import styled from "styled-components"

//styling 
const Nav = styled.div`
  position: relative;
  border-radius: 25px;
  padding: 0 2px;
  height: 25px;
  background: #efefefb9;
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
  font-size: 12.5px;
  font-weight: 600;
  height: 21px;
  line-height: 21px;
  border-radius: 25px;
  color: #b7b7b7;
  max-width: 75px;
  width: calc(100vw / 4 - 10px);
  text-align: center;
  transition: all 0.1s ease-in-out;
  
  &:hover & {
  color: #b7b7b79a;
  transition: all 0.1s ease-in-out;
  }
`;



const ViewSize = ({ listArr }) => {
  const { view, setView } = useContext(ViewContext)
  const NavActive = { color: "#fff" };
  const index = () => listArr.findIndex(e => e === view);
  const isActive = e => e === view ? NavActive : {}
  const moveActive = e => 2 + 75 * index()


  return (
    <Nav>
      <Backdrop className="viewActive" style={{ left: `${moveActive()}px` }} />
      {listArr.map(elm => <ListItem key={elm} className="viewLink" style={isActive(elm)} onClick={() => setView(elm)}>{elm}</ListItem>)}
    </Nav >
  );
}

export default ViewSize;
