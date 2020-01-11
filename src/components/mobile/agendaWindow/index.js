import React, { useEffect, useState } from "react";
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
grid-column: 1;
grid-row: 1/4;
overflow: hidden;
width: 100vw;
`


const Agenda = React.memo(({ route, view, source, listArr, startingPoint }) => {

  const today = new Date(startingPoint).setHours(0, 0, 0, 0);
  const startPoint = new Date(today).setMonth(new Date(today).getMonth() - 1);
  const todayEnd = new Date(startingPoint).setHours(23, 59, 59, 99);
  const startPointEnd = new Date(todayEnd)
  // .setDate(new Date(todayEnd).getDate() - 1)

  const [data, setData] = useState({});
  const [fetchFinshed, setFetchFinshed] = useState(false);
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

  console.log(view, listArr[1])
  return (
    <Section>
      <ListView edge={edge} show={view === listArr[0] && fetchFinshed} startingPoint={startingPoint} data={data} />
      <DayView edge={edge} show={view === listArr[1] && fetchFinshed} startingPoint={startingPoint} data={data} />

      {/* agenda data */}
      {offsetArr && offsetArr.map((i, e) => {
        const startZipcode = new Date(startPoint).setMonth(new Date(startPoint).getMonth() + i);
        const endZipcode = new Date(startPointEnd).setMonth(new Date(startPointEnd).getMonth() + i);
        // console.log("-----------")
        // console.log(new Date(startZipcode).getDate(), new Date(startZipcode).getMonth(), new Date(endZipcode).getDate(), new Date(endZipcode).getMonth())
        return <Chunk key={`listener_${i}`} startZipcode={startZipcode} endZipcode={endZipcode} sources={source} finshed={setFetchFinshed} setRender={setData} />
      })}
    </Section>
  );
});

export default Agenda;
