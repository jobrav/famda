import React, { useReducer, useState, useEffect } from "react";
import { Chunk } from "../../../../func/chunkItem"
import Appointment from "./appointment"
import Event from "./event";
import Sign from "./sign";
import styled from "styled-components"
let storage = 0;
const Container = styled.div`
display: grid;
width: 100%;
height: 100%;
overflow: auto;
scroll-snap-type: x mandatory;
scroll-padding: 45px;
grid-gap: 2.5px;
grid-template-columns: 45px 1fr;
grid-template-rows: 100px 1fr;
background: ${props => props.theme.primaryBGC || "#fff"};
`
const Head = styled.div`
  grid-row: 1;
  grid-column: 2;
  padding: 5px 0;
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
  padding-top: 55px;
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
cursor: default;
pointer-events: none;
justify-self: end;
align-self: end;
text-align: right;
margin: 0;
font-size:12.5px;
color: ${props => props.theme.primaryFC || "#fff"};
`
const CurrentTimeLine = styled.div`
transform:translateY(${props => (props.currentTime * 17 / 15) || 0}px);
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
const ContainerWholeItem = styled.div`
grid-row: 2;
min-width: 250px;
padding: 0 5px;
margin: 2px 2.5px;
background: ${props => props.theme.secondaryBGC || "#f7f7f7"};
`
const ContainerDayItem = styled.div`
overflow-x: hidden;
min-width: 250px;
display: grid;
grid-template-rows: repeat(96, 17px);
margin: 2px 2.5px;
scroll-snap-align: start;
background: ${props => props.theme.secondaryBGC || "#f7f7f7"};
`
const DayView = React.memo(({ source, startingPoint, output, placeholder }) => {

  const today = new Date().setHours(0, 0, 0, 0)
  const AminView = new Date(today).setMonth(new Date(today).getMonth() - 1);
  const AmaxView = new Date(today).setHours(23, 59, 59, 99)
  const BminView = new Date(today)
  const BmaxView = new Date(AmaxView).setMonth(new Date(today).getMonth() + 1);


  const getRender = (render, today) => {
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
              <ContainerWholeItem key={`${obj.zipcode}_whole_day`}>
                {eventBucket}
              </ContainerWholeItem>
            )
            bucket.body.push(
              <ContainerDayItem key={`${obj.zipcode}_container_day`}>
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

  const [data, setData] = useState({})
  const [render, setRender] = useState(placeholder);
  const [renderTime, setRenderTime] = useState(0);

  const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
  useEffect(() => {

    const timeline = document.getElementById("timeline"); // get timeline container
    const currentScrollX = timeline.scrollLeft; // get current scroll from left
    const currentScrollY = timeline.scrollTop; // get current scroll from left

    getRender(data, today).then(render => { // create render
      setRender(render); //push render
      const startItem = document.getElementsByClassName(`sign_zipcode_${new Date(startingPoint).setHours(0, 0, 0, 0)}`)[0]; // get today element
      timeline.scrollLeft = startItem ? startItem.offsetLeft : currentScrollX; // scroll to startingpoint or fix scroll bug
      timeline.scrollTop = renderTime < 5 ? currentTime * 17 / 15 - 100 : currentScrollY; // scroll to startingpoint or fix scroll bug
      setRenderTime(prev => prev += 1) // add rendertime
    });
  }, [data, startingPoint])



  return <div className="dayView view">
    <Container id="timeline">
      <Legenda><Number>Hele dag</Number></Legenda>
      <CurrentTimeLine id="currentTimeLine" currentTime={currentTime} />
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
    <Chunk startZipcode={AminView} endZipcode={AmaxView} sources={source} setRender={setData} />
    <Chunk startZipcode={BminView} endZipcode={BmaxView} sources={source} setRender={setData} />
  </div>
});

export default DayView;
