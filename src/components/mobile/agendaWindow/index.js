import React, { useEffect, useState, useContext } from "react";
import ListView from "./views/list/list";
import ListPerDayView from "./views/listPerDay";
import ViewToolbar from "../viewToolbar"
import ToolbarTop from "../toolbarTop"
import DayView from "./views/day/day";
import WeekView from "./views/week";
import MonthView from "./views/month";
import "./style.css";
import styled from "styled-components"
import { Chunk } from "../../../func/chunkItem"
import { ViewContext, DateContext } from "../../../contexts"

let renderList = [];
let cache = [];

const Section = styled.section`
grid-column: 1;
grid-row: 1/4;
overflow: hidden;
width: 100vw;
height: 100vh;
`


const Agenda = React.memo(({ route: { match: { params }, location }, source, listArr, startingPoint }) => {
  const { view, setView } = useContext(ViewContext)
  const { startPoint, setStartPoint } = useContext(DateContext)

  const today = new Date(startingPoint).setHours(0, 0, 0, 0);
  const [startTestPoint, setStartTestPoint] = useState(today);
  const [currentDate, setCurrentDate] = useState(today);
  const todayEnd = new Date(startingPoint).setHours(23, 59, 59, 99);
  const [startPointChunk, setStartPointChunk] = useState(new Date(today).setMonth(new Date(today).getMonth() - 1));
  const startPointEndChunk = new Date(todayEnd)
  // .setDate(new Date(todayEnd).getDate() - 1)

  const [data, setData] = useState({});
  const [fetchFinshed, setFetchFinshed] = useState(false);
  const [offsetArr, setOffsetArr] = useState([0, 1])
  const [startBorders, setStartBorders] = useState(new Date(startPointChunk));
  const [endBorders, setEndBorders] = useState(new Date(startPointEndChunk).valueOf());

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
    let offsetStartYears = (new Date(startBorders).getFullYear() - new Date(startPointChunk).getFullYear()) * 11;
    let offsetStartMonths = new Date(startBorders).getMonth() - new Date(startPointChunk).getMonth();

    let offsetEndYears = (new Date(endBorders).getFullYear() - new Date(startPointEndChunk).getFullYear()) * 11;
    let offsetEndMonths = new Date(endBorders).getMonth() - new Date(startPointEndChunk).getMonth();

    let offsetStart = offsetStartYears + offsetStartMonths;
    let offsetEnd = offsetEndYears + offsetEndMonths + 1;

    setOffsetArr([])
    for (let i = offsetStart; i <= offsetEnd; i++) setOffsetArr(prev => [...prev, i])
  }, [startBorders, endBorders])

  return (
    <Section className={["pannel", "returnPannel", "nonePannel"][Object.values(params).length]}>
      <ToolbarTop listArr={listArr} view={view} changeView={setView} />
      {(view === listArr[1] || view === listArr[2]) && <ViewToolbar changeDate={setStartPoint} givenDate={currentDate} />}

      {view === listArr[0] && <ListView scrollTo={startPoint} show={fetchFinshed} startingPoint={startingPoint} data={data} />}
      {view === listArr[1] && <ListPerDayView scrollTo={startPoint} show={fetchFinshed} currentDate={currentDate} setCurrentDate={setCurrentDate} startingPoint={startTestPoint} data={data} />}
      {view === listArr[2] && <DayView scrollTo={startPoint} show={fetchFinshed} currentDate={currentDate} setCurrentDate={setCurrentDate} startingPoint={startingPoint} data={data} />}

      {/* agenda data */}
      {offsetArr && offsetArr.map((i, e) => {
        const startZipcode = new Date(startPointChunk).setMonth(new Date(startPointChunk).getMonth() + i);
        const endZipcode = new Date(startPointEndChunk).setMonth(new Date(startPointEndChunk).getMonth() + i);
        // console.log("-----------")
        // console.log(new Date(startZipcode).getDate(), new Date(startZipcode).getMonth(), new Date(endZipcode).getDate(), new Date(endZipcode).getMonth())
        return <Chunk key={`listener_${i}`} startZipcode={startZipcode} endZipcode={endZipcode} sources={source} finshed={setFetchFinshed} setRender={setData} />
      })}
    </Section>
  );
});

export default Agenda;
