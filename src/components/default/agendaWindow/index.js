import React, { useEffect, useState, useContext } from "react";
import { DateContext } from "../../../contexts";
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
grid-column: 2/4;
grid-row: 2;
overflow: hidden;
width: 100%;
height: 100%;
border-radius: 0;
position: relative;
`


const Agenda = React.memo(({ route, view, source, listArr, startingPoint }) => {
  // const { startPoint, setStartPoint } = useContext(DateContext)
  const today = new Date(startingPoint).setHours(0, 0, 0, 0);
  const startPoint = new Date(today).setMonth(new Date(today).getMonth() - 1);
  const todayEnd = new Date(startingPoint).setHours(23, 59, 59, 99);
  const startPointEnd = new Date(todayEnd)
  // .setDate(new Date(todayEnd).getDate() - 1)

  const [data, setData] = useState({});
  const [dataReady, setDataReady] = useState(false);
  const [fetchFinshed, setFetchFinshed] = useState(0);
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
    fetchFinshed >= offsetArr.length && setDataReady(true)
  }, [fetchFinshed])

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
      {/* <ListView edge={edge} show={view === listArr[0] && fetchFinshed} startPoint={startingPoint} data={data} /> */}
      <DayView edge={edge} show={view === listArr[1]} startPoint={startingPoint} dataReady={dataReady} data={data} />

      {/* agenda data */}
      {offsetArr && offsetArr.map((i, e) => {
        const startZipcode = new Date(startPoint).setMonth(new Date(startPoint).getMonth() + i);
        const endZipcode = new Date(startPointEnd).setMonth(new Date(startPointEnd).getMonth() + i);
        return <Chunk key={`listener_${i}`} startZipcode={startZipcode} endZipcode={endZipcode} sources={source} finshed={setFetchFinshed} setRender={setData} />
      })}
    </Section>
  );
});

export default Agenda;
