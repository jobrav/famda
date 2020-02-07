import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

//styling 
const Nav = styled.div`
  position: fixed;
  bottom: 55px;
  left: 10px;
  margin-bottom: 2.5px;
  z-index: 10;
  border-radius: 15px;
  padding: 2.5px 5px;
  width: calc(100vw - 30px);
  background: ${props => props.theme.floatSecBGC || "#f3f3f3da"};
  backdrop-filter: blur(20px) saturate(180%);
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-template-rows: max-content;
`
const ListItem = styled.a`
  justify-self: center;
  align-self: stretch;
  transition: all 0.1s ease-in-out;
  display:grid;
  grid-template-columns: 25px;
  grid-template-rows: 15px 25px;
  grid-gap:3px;
  padding: 2.5px 0;
`;
const Text = styled.h4`
justify-self:center;
margin:0;
padding:0;
font-size: ${props => props.theme.defaultFontSize};
font-weight: 500;
color: ${({ theme: { hueReverse } }) => hueReverse};
-webkit-text-fill-color:  ${({ theme: { hueReverse } }) => hueReverse};
text-align: center;
`
const Number = styled(Text)`
align-self:stretch;
justify-self:stretch;
line-height: 25px;
border-radius: 25px;
${({ active }) => active ? "color: #fff !important;" : null};
${({ active }) => active ? "-webkit-text-fill-color: #fff !important;" : null};
background: ${({ active, theme: { blue } }) => active ? blue : 'transparent'};

`
const Day = styled(Text)`
align-self:start;
font-size: 8px;
`

const Add = styled(Link)`
  padding:5px;
  justify-self: center;
  align-self: center;
`
const AddIcon = styled.svg`
  background: ${({ theme: { blue } }) => blue};
width: 20px;
height: 20px;
`


const days = ['M', 'D', 'W', 'D', 'V', 'Z', 'Z']

const ViewToolbar = React.memo(({ givenDate }) => {
  const startDate = givenDate ? new Date(givenDate) : new Date()
  return (
    <Nav>
      {[0, 1, 2, 3, 4, 5, 6].map((bar, i) => {
        const startDay = new Date(startDate).getDate()
        const dayInWeek = new Date(startDate).getDay();
        const itemsDate = new Date(startDate).setDate(startDay - dayInWeek + i + 1);
        return <ListItem key={i}>
          <Day>{days[i]}</Day>
          <Number active={itemsDate === new Date(startDate).valueOf()}>{new Date(itemsDate).getDate()}</Number>
        </ListItem>
      })}
    </Nav >
  );
})

export default ViewToolbar;
