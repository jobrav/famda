import React, { useState, useEffect } from "react";
import Appointment from "./appointment"
import Event from "./event";
import Sign from "./sign";
import styled from "styled-components"
let storage = 0;

const Section = styled.div`
height: 100%;
overflow-y: auto;
position: absolute;
width: 100%;
transform-origin: top center;
display:grid;
grid-template-rows: 75px 1fr;
grid-template-columns: 1fr;
display: ${props => props.show ? null : "none"};
`

const Container = styled.div`
display: grid;
width: 100vw;
height: 100%;
will-change: transform;
overflow: auto;
scroll-snap-type: x mandatory;
scroll-padding: 25px;
grid-gap: 0 2.5px;
grid-template-columns: 25px 1fr;
grid-template-rows: auto 1fr;
background: ${props => props.theme.primaryBGC || "#fff"};
`
const Head = styled.div`
  grid-row: 1;
  grid-column: 2;
  position: sticky;
  top: 0;
  z-index: 4;
  display: grid;
  grid-auto-flow: column;
  `
const Body = styled.div`  
  grid-row: 2;
  grid-column: 2;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  background: ${props => props.theme.primaryBGC || "#fff"};
`
const Timetable = styled.div`
  cursor: default;
  pointer-events: none;
  background: ${props => props.theme.primaryBGC || "#fff"}
  width: 25px;
  z-index:6;
  display: grid;
  grid-template-rows: repeat(24, auto);
`
const Number = styled.p`
cursor: default;
pointer-events: none;
justify-self: center;
transform: translateY(-5px);
align-self: end;
text-align: right;
margin: 0;
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
    transform: translate(21px, -4px);
    left: 0;
    margin: 0;
    padding: 0;
    display: block;
    border-radius: 8px;
}
`
const ContainerWholeItem = styled.div`
  grid-row: 1;
  width: calc(100vw - 25px);
  margin: 0 2.5px;
  position: relative;
`
const ContainerDayItem = styled.div`
  overflow-x: hidden;
  width: calc(100vw - 25px);
  display: grid;
  grid-template-rows: repeat(96,14px);
  margin: 0 2.5px;
  scroll-snap-align: start;
`
const WholeDayAbsolute = styled.div` 
position: absolute;
width: 100%;
`
const Header = styled.div`
width: 100vw;
height:100%;
background: ${props => props.theme.secondaryBGC || "#f3f3f3"};
border-bottom: 1px solid ${props => props.theme.secondaryBGC || "#f3f3f3"};
`

const DayView = React.memo(({ show, startingPoint, data, edge }) => {

  const today = new Date(startingPoint).setHours(0, 0, 0, 0)
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
              <ContainerWholeItem key={`${obj.zipcode}_whole_day`}>
                <WholeDayAbsolute>
                  {eventBucket[0] && <Event key={`${obj.zipcode}_${obj.id}_evt`} data={{ title: "Hele dag:", id: `${obj.zipcode}_sign`, zipcode: obj.zipcode }} />}
                  {eventBucket}
                </WholeDayAbsolute>
              </ContainerWholeItem>
            )
            bucket.body.push(
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
            )
            bucket.body.push(
              <ContainerDayItem className={`sign_zipcode_${new Date(obj.zipcode).setHours(0, 0, 0, 0)}`} key={`${obj.zipcode}_container_day`}>
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

  const [render, setRender] = useState([]);
  const [renderTime, setRenderTime] = useState(0);
  let scrollToStartingPoint = false;

  useEffect(() => {
    setRenderTime(0)
  }, [show])

  const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
  useEffect(() => {
    let timeline = document.getElementById("timeline"); // get timeline container
    const currentScrollRight = timeline.scrollWidth - timeline.scrollLeft; // get current scroll from left
    const currentScrollY = timeline.scrollTop; // get current scroll from left
    getRender(data, today).then(render => { // create render
      setRender(render); //push render
      const startItem = document.getElementsByClassName(`sign_zipcode_${new Date(startingPoint).setHours(0, 0, 0, 0)}`)[0]; // get today element
      if (!scrollToStartingPoint) {
        scrollToStartingPoint = true
        timeline.scrollLeft = startItem ? startItem.offsetLeft + 25 : 0;
      } else timeline.scrollLeft = timeline.scrollWidth - currentScrollRight; // scroll to startingpoint or fix scroll bug

      timeline.scrollTop = renderTime < 5 ? currentTime * 14 / 15 - 100 : currentScrollY; // scroll to startingpoint or fix scroll bug
      setRenderTime(prev => prev += 1) // add rendertime
    });
  }, [data, startingPoint])

  const scrolling = input => {
    const scroll = Math.round(input.target.scrollLeft);
    const width = Math.round(input.target.scrollWidth - input.target.offsetWidth);
    if (scroll <= 305 && scroll >= 295) edge("start")
    else if (scroll >= width - 305 && scroll <= width - 295) edge("end")
  }


  return <Section show={show}>
    <Header>Hier komt de agenda op houd</Header>
    <Container onScroll={scrolling} id="timeline">
      {/* <Legenda></Legenda> */}
      <CurrentTimeLine id="currentTimeLine" currentTime={currentTime} />
      <Head>{render.map(e => e.head)}</Head>
      <Body>{render.map(e => e.body)}</Body>
    </Container>
  </Section>
});

export default DayView;
