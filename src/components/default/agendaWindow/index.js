import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ListView from "./views/list/list";
import DayView from "./views/day/day";
import WeekView from "./views/week";
import MonthView from "./views/month";
import "./style.css";
import styled from "styled-components"
import { Chunk } from "../../../func/chunkItem"

let renderList = [];
let cache = [];

const Section = styled.section`
border-top: ${props => props.theme.secondaryBGC || "#f3f3f3"} 1px solid;
grid-column: 2;
grid-row: 2;
overflow: hidden;
width: 100%;
height: 100%;
border-radius: 0;
`
const Wrapper = styled.div`
position: relative;
width: auto;
width: 100%;
height: 100%;
`


const Agenda = React.memo(({ route, view, source, listArr, startingPoint }) => {

  const today = new Date(startingPoint).setHours(0, 0, 0, 0);
  const startPoint = new Date(today).setMonth(new Date(today).getMonth() - 1);
  const startPointEnd = new Date(today).setHours(23, 59, 59, 99)

  const [data, setData] = useState({});
  const [offsetArr, setOffsetArr] = useState([0, 1])
  const [startBorders, setStartBorders] = useState(new Date(startPoint));
  const [endBorders, setEndBorders] = useState(new Date(startPointEnd).valueOf());

  const edge = side => {
    if (side === "end") {
      const getMonth = new Date(endBorders).getMonth() + 1;
      setEndBorders(() => new Date(endBorders).setMonth(getMonth))
    } else {
      const getMonth = new Date(startBorders).getMonth() - 1;
      setStartBorders(() => new Date(startBorders).setMonth(getMonth))
    }
  }

  useEffect(() => {
    let offsetStartYears = (new Date(startBorders).getFullYear() - new Date(startPoint).getFullYear()) * 11;
    let offsetStartMonths = new Date(startBorders).getMonth() - new Date(startPoint).getMonth();

    let offsetEndYears = (new Date(endBorders).getFullYear() - new Date(startPointEnd).getFullYear()) * 11;
    let offsetEndMonths = new Date(endBorders).getMonth() - new Date(startPointEnd).getMonth();

    let offsetStart = offsetStartYears + offsetStartMonths;
    let offsetEnd = offsetEndYears + offsetEndMonths + 1;

    setOffsetArr([])
    for (let i = offsetStart; i <= offsetEnd; i++) setOffsetArr(prev => [...prev, i])
  }, [startBorders, endBorders])

  return (
    <Section>
      <Wrapper className="render">
        {renderList ?
          <div>
            <ListView edge={edge} show={view === listArr[0]} startingPoint={startingPoint} data={data} />
            <DayView edge={edge} show={view === listArr[1]} startingPoint={startingPoint} data={data} />
          </div>
          : <div />}
      </Wrapper>

      {/* agenda data */}
      {offsetArr && offsetArr.map((i, e) => {
        const startZipcode = new Date(startPoint).setMonth(new Date(startPoint).getMonth() + i);
        const endZipcode = new Date(startPointEnd).setMonth(new Date(startPointEnd).getMonth() + i);
        return <Chunk key={`listener_${i}`} startZipcode={startZipcode} endZipcode={endZipcode} sources={source} setRender={setData} />
      })}
    </Section>
  );
});

export default Agenda;
