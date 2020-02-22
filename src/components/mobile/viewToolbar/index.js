import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  // background: ${props => props.theme.floatSecBGC || "#f3f3f3da"};
  background: ${({ theme: { darkMode, hue, gray6 } }) => darkMode ? gray6 : hue}da;
  backdrop-filter: blur(20px) saturate(180%);
  display: grid;
  grid-template-columns:1fr;
  grid-template-rows: repeat(2,max-content);
  overflow:hidden;
`
const DayRow = styled.div`
  justify-self: stretch;
  align-self: stretch;
  // transition: all 0.1s ease-in-out;
  display:grid;
  grid-template-rows: 15px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  padding-top: 2.5px;
`;
const DateRow = styled.div`
position: relative;
  justify-self: stretch;
  align-self: stretch;
  // transition: all 0.1s ease-in-out;
  display:grid;
  grid-template-rows: 35px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  padding-bottom: 2.5px;
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
width: 35px;
width: 35px;
justify-self:center;
align-self:center;
line-height: 35px;
transition: all 100ms ease-in-out;
border-radius: 35px;
color: ${({ today, active, theme: { blue, hue, hueReverse } }) => today ? active ? "#fff" : blue : active ? hue : hueReverse};
-webkit-text-fill-color: ${({ today, active, theme: { blue, hue, hueReverse } }) => today ? active ? "#fff" : blue : active ? hue : hueReverse};
background: ${({ today, active, theme: { blue, hueReverse } }) => active ? today ? blue : hueReverse : 'transparent'};

&:active{
  color: #fff;
  -webkit-text-fill-color: #fff;
}
`

const Day = styled(Text)`
align-self:start;
font-size: 8px;
`
let pressTimeOut;
let clientX = 0;
const windowWidth = window.outerWidth;

const touchMove = ({ touches, currentTarget: { style } }) => {
  clearTimeout(pressTimeOut);
  style.transform = `translateX(${touches[0].clientX - clientX}px)`;
}

const moveFor = (style) => {
  style.transition = "transform 0ms ease-in-out";
  style.transform = `translateX(100vw)`;
  setTimeout(() => {
    style.transition = "transform 200ms ease-in-out";
    style.transform = `translateX(0vw)`;
  }, 10)
}
const moveBack = (style) => {
  style.transition = "transform 0ms ease-in-out";
  style.transform = `translateX(-100vw)`;
  setTimeout(() => {
    style.transition = "transform 200ms ease-in-out";
    style.transform = `translateX(0vw)`;
  }, 50)
}

const days = ['Z', 'M', 'D', 'W', 'D', 'V', 'Z']



const ViewToolbar = React.memo(({ givenDate, changeDate }) => {
  let history = useHistory();
  const touchStart = ({ touches, currentTarget: { style } }) => {
    style.transition = "transform 0ms ease-in-out";
    clientX = touches[0].clientX;
    pressTimeOut = setTimeout(() => history.push("datepicker/"), 600)
  }

  const [startDate, setStateDate] = useState(givenDate ? new Date(givenDate).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0))
  const [activeDate, setActiveDate] = useState(givenDate ? new Date(givenDate).setHours(0, 0, 0, 0) : startDate)
  const startDateDate = new Date(startDate).getDate();
  const activeDateDate = new Date(activeDate).getDate();

  const touchEnd = ({ changedTouches, currentTarget: { style } }) => {
    clearTimeout(pressTimeOut);
    const change = changedTouches[0].clientX - clientX
    style.transition = "transform 200ms ease-in-out";

    if (change > windowWidth / 3) {
      style.transform = `translateX(100vw)`;
      setTimeout(() => {
        moveBack(style);

        move(new Date(startDate).setDate(startDateDate - 7))
      }, 200)
    }
    else if (change < -windowWidth / 3) {
      style.transform = `translateX(-100vw)`;
      setTimeout(() => {
        moveFor(style);
        move(new Date(startDate).setDate(startDateDate + 7))
      }, 200)
    }
    else style.transform = `translateX(0px)`;
  }

  const move = (itemsDate) => {
    setStateDate(itemsDate)
    changeDate(itemsDate)
    setActiveDate(itemsDate)
  }
  useEffect(() => {
    setStateDate(givenDate)
    setActiveDate(givenDate)
  }, [givenDate])

  const startDay = new Date(startDate).getDate()
  const dayInWeek = new Date(startDate).getDay();
  return (
    <Nav>
      <DayRow>{[0, 1, 2, 3, 4, 5, 6].map(i => <Day key={i}>{days[i]}</Day>)}</DayRow>
      <DateRow onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd}>
        {[0, 1, 2, 3, 4, 5, 6].map((_, i) => {
          const itemsDate = new Date(startDate).setDate(startDay - dayInWeek + i);
          return <Number key={i} onClick={() => move(itemsDate)} today={itemsDate === new Date().setHours(0, 0, 0, 0)}
            active={itemsDate === activeDate}>
            {new Date(itemsDate).getDate()}</Number>
        })}
      </DateRow>
    </Nav >
  );
})

export default ViewToolbar;
