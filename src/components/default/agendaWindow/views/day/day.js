import React, { useState, useEffect, useContext } from "react";
import Appointment from "./appointment"
import Event from "./event";
import Sign from "./sign";
import styled from "styled-components"
import ContextMenu from "../../../contextMenu"

let storage = 0;
const Container = styled.div`
display: grid;
width: 100%;
height: 100%;
overflow: auto;
scroll-snap-type: x mandatory;
scroll-padding: 45px;
grid-gap: 0 2.5px;
grid-template-columns: 45px 1fr;
grid-template-rows: auto 1fr;
background: ${props => props.theme.primaryBGC || "#fff"};
`
const Head = styled.div`
  grid-row: 1;
  grid-column: 2;
  background: ${props => props.theme.primaryBGC || "#fff"};
  position: sticky;
  top:0;
  z-index: 8;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 45px 50px;
  `
const Body = styled.div`  
  grid-row: 2;
  grid-column: 2;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  background: ${props => props.theme.primaryBGC || "#fff"};
`

const Legenda = styled.div`
cursor: default;
pointer-events: none;
  width: 40px;
  padding-right: 5px;
  padding-top: 50px;
  grid-row: 1;
  grid-column: 1;
  position: sticky;
  top:0;
  left:0;
  height: 45px;
  z-index:9;
  background: ${props => props.theme.primaryBGC || "#fff"}
`
const Timetable = styled.div`
cursor: default;
pointer-events: none;
  position: sticky;
  left:0;
  background: ${props => props.theme.primaryBGC || "#fff"}
  grid-row: 2;
  grid-column: 1;
  width: 40px;
  padding-right: 5px;
  z-index:6;
  display: grid;
  grid-template-rows: repeat(24, auto);
`
const Number = styled.p`
font-weight: 300;
cursor: default;
pointer-events: none;
justify-self: end;
align-self: end;
text-align: right;
margin: 0;
transform:translateY(7.5px);
font-size: ${props => props.theme.defaultFontSize};
color: ${props => props.theme.primaryFC || "#fff"};
-webkit-text-fill-color: ${props => props.theme.primaryFC || "#fff"};
`
const CurrentTimeLine = styled.div`
transform:translateY(${props => (props.currentTime * 14 / 15) || 0}px);
grid-row:2;
grid-column:1/3;
position: sticky;
left:0;
background: red;
height: 1px;
width:100%;
z-index: 7;

&:after{
  content: '';
    background: red;
    height: 8px;
    position: sticky;
    width: 8px;
    transform: translate(41px, -4px);
    left: 0;
    margin: 0;
    padding: 0;
    display: block;
    border-radius: 8px;
}
`
const HoverTimeLine = styled.div`
grid-row: 20;
display:none;
grid-column:1;
position: relative;
background: ${props => props.theme.primaryFHC};
height: 1px;
width:100%;
`
const ContainerWholeItem = styled.div`
grid-row: 2;
min-width: 200px;
padding: 0 5px;
margin: 2.5px;
background: ${props => props.theme.secondaryBGC || "#f7f7f7"};
`
const ContainerDayItem = styled.div`
overflow-x: hidden;
min-width: 200px;
display: grid;
grid-template-rows: repeat(288, 4.5px);
margin: 0 2.5px;
scroll-snap-align: start;
background: ${props => props.theme.secondaryBGC || "#f7f7f7"};
`
let cache = [{ body: [], head: [] }];


const DayView = React.memo(({ show, dataReady, data, edge, startPoint }) => {
  //states
  const [contextPos, setContextPos] = useState({ x: 0, y: 0 })
  const [contextMenuShow, setContextMenuShow] = useState(false)
  const [render, setRender] = useState([]);


  const today = new Date(startPoint).setHours(0, 0, 0, 0)
  const AminView = new Date(today).setMonth(new Date(today).getMonth() - 1);

  const getRender = (render) => {
    return new Promise(resolve => {
      const chunkList = Object.values(render)
      let dayBucket = [];
      let eventBucket = [];
      let prev = AminView;
      let test = chunkList ? chunkList.map(renderList => {
        let bucket = { head: [], body: [] };
        renderList.forEach(obj => {
          let metaData = obj;

          //today
          if (
            new Date(obj.zipcode).setHours(0, 0, 0, 0) >
            new Date(storage).setHours(0, 0, 0, 0)
          ) {
            bucket.head.push(
              <Sign
                key={`${obj.zipcode}_sign`}
                zipcode={new Date(storage).setHours(0, 0, 0, 0)}
                input={metaData.date || null}
              />
            );
            bucket.head.push(
              <ContainerWholeItem onContextMenu={showMenu} key={`${obj.zipcode}_whole_day`}>
                {eventBucket}
              </ContainerWholeItem>
            )
            bucket.body.push(
              <ContainerDayItem
                onMouseEnter={hoverTimeLineEnter}
                onMouseLeave={hoverTimeLineLeave}
                onMouseMove={hoverTimeLineMove}
                onContextMenu={showMenu}
                onClick={showMenu}
                key={`${obj.zipcode}_container_day`}>
                <HoverTimeLine className="hoverTimeLine" />
                {dayBucket}
              </ContainerDayItem>
            )
            dayBucket = []
            eventBucket = []
          }
          prev = obj.zipcode
          storage = obj.zipcode;
          // feed or no feed
          if (metaData && (metaData.feed || metaData.fullDay == false)) {
            dayBucket.push(
              <Appointment
                key={`${obj.zipcode}_${obj.id}_apm`}
                zipcode={obj.zipcode}
                data={metaData}
              />
            );
          } else if (metaData) eventBucket.push(<Event key={`${obj.zipcode}_${obj.id}_evt`} data={metaData} />);
        });
        return bucket;
      }) : null;
      resolve(test)
    })
  }

  const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
  useEffect(() => {
    if (dataReady) {
      getRender(data, today).then(render => { // create render
        setRender(render); //push render
        cache = render;
      });
    } else setRender(cache);
    scrollToStartPoint();
  }, [data])

  const scrollToStartPoint = () => {
    const timeline = document.getElementById("timeline"); // get timeline container
    const startItem = document.getElementsByClassName(`sign_zipcode_${new Date(startPoint).setHours(0, 0, 0, 0)}`)[0]; // get today element
    timeline.scrollTop = currentTime * 14 / 15 - 100;
    timeline.scrollLeft = startItem ? startItem.offsetLeft : 0;
  }


  useEffect(() => {
    scrollToStartPoint()
  }, [startPoint])

  const showMenu = (ev) => {
    if (ev.target === ev.currentTarget) {
      ev.preventDefault()
      setContextPos({ "x": ev.clientX, "y": ev.clientY })
      setContextMenuShow(true);
      document.addEventListener('click', hideMenu)
    }
  }
  const hideMenu = (ev) => {
    setContextMenuShow(false);
    document.removeEventListener('click', hideMenu)
  }
  const hoverTimeLineEnter = ({ currentTarget }) => currentTarget.getElementsByClassName("hoverTimeLine")[0].style.display = "block";
  const hoverTimeLineMove = ({ target, currentTarget, clientY }) => {
    const timeline = currentTarget.parentElement.parentElement;
    const position = (clientY + timeline.scrollTop - 144) / 4.5;
    const gridPos = Math.round(position);
    currentTarget.getElementsByClassName("hoverTimeLine")[0].style.gridRow = gridPos;
  }
  const hoverTimeLineLeave = ({ currentTarget }) => currentTarget.getElementsByClassName("hoverTimeLine")[0].style.display = "none";

  const scrolling = input => {
    const scroll = Math.round(input.target.scrollLeft);
    const width = Math.round(input.target.scrollWidth - input.target.offsetWidth);
    if (scroll <= 305 && scroll >= 295) edge("start")
    else if (scroll >= width - 305 && scroll <= width - 295) edge("end")
  }


  return <div style={{ display: show ? null : "none" }} className="dayView view">
    <Container onScroll={scrolling} id="timeline">
      {contextMenuShow && <ContextMenu contextPos={contextPos} />}
      <Legenda><Number>Hele dag</Number></Legenda>
      <CurrentTimeLine id="currentTimeLine" className="currentTimeLine" currentTime={currentTime} />
      <Timetable>
        <Number>1</Number>
        <Number>2</Number>
        <Number>3</Number>
        <Number>4</Number>
        <Number>5</Number>
        <Number>6</Number>
        <Number>7</Number>
        <Number>8</Number>
        <Number>9</Number>
        <Number>10</Number>
        <Number>11</Number>
        <Number>12</Number>
        <Number>13</Number>
        <Number>14</Number>
        <Number>15</Number>
        <Number>16</Number>
        <Number>17</Number>
        <Number>18</Number>
        <Number>19</Number>
        <Number>20</Number>
        <Number>21</Number>
        <Number>22</Number>
        <Number>23</Number>
        <Number>24</Number>
      </Timetable>
      <Head>{render.map(e => e.head)}</Head>
      <Body>{render.map(e => e.body)}</Body>
    </Container>
  </div>
});

export default DayView;
