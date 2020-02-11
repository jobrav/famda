import React, { useEffect, useState } from "react";
import styled from "styled-components"
import Appointment from "./appointment";
import Event from "./event";
import Sign from "./sign";


let storage = 0;

const Section = styled.div`
height: 100%;
overflow: none;
position: absolute;
width: 100%;
overflow-x:hidden;
overflow-y:auto;
background: ${({ theme: { hue, darkMode, gray6 } }) => darkMode ? hue : gray6}
display: ${props => props.show ? 'grid' : "none"};
// scroll-snap-type: x proximity;
grid-auto-flow: column;
grid-template-rows: 1fr;
column-gap: 15px;
`
const ContainerDayItem = styled.div`
  overflow-x: hidden;
  width: 100vw;
  display: grid;
  grid-auto-flow:row;
  grid-auto-rows: max-content;
  // scroll-snap-align: start;
`
let clientX = 0;
let startPos = 0;
const windowWidth = window.outerWidth;
const touchStart = ({ touches, currentTarget }) => {
  clientX = touches[0].clientX;
  startPos = currentTarget.scrollLeft;
}
const touchMove = ({ touches, currentTarget }) => currentTarget.scrollLeft = startPos + clientX - touches[0].clientX;


const ListPerDayView = ({ show, startingPoint, data, setCurrentDate, currentDate }) => {

  const today = new Date(startingPoint).setHours(0, 0, 0, 0)
  const AminView = new Date(today).setMonth(new Date(today).getMonth() - 1);

  const getRender = (render) => {
    return new Promise(resolve => {
      const chunkList = Object.values(render)
      let dayBucket = [];
      let prev = AminView;
      let test = chunkList ? chunkList.map(renderList => {
        return renderList.map(obj => {
          // let docData = docdata();
          let bucket = [];
          let metaData = obj;
          // let metaData = docData && docData[obj.id];

          //today
          if (
            new Date(obj.zipcode).setHours(0, 0, 0, 0) >
            new Date(storage).setHours(0, 0, 0, 0)
          ) {
            dayBucket = [<Sign
              key={`${obj.zipcode}_sign`}
              zipcode={new Date(obj.zipcode).setHours(0, 0, 0, 0)}
              input={metaData.date || null}
            />, ...dayBucket]

            bucket.push(
              <ContainerDayItem className={`sign_zipcode_${new Date(obj.zipcode).setHours(0, 0, 0, 0)}`} key={`${obj.zipcode}_container_day`}>
                {dayBucket}
              </ContainerDayItem>
            )
            dayBucket = []

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
          } else if (metaData) dayBucket.push(<Event key={`${obj.zipcode}_${obj.id}_evt`} data={metaData} />);
          return bucket;
        });
      }) : null;
      resolve(test)
    })
  }


  const touchEnd = ({ changedTouches, currentTarget }) => {

    const change = changedTouches[0].clientX - clientX
    // currentTarget.style.scrollBehavior = "smooth";
    const currentDateDate = new Date(currentDate).getDate();

    if (change > windowWidth / 3) {
      currentTarget.scroll({ left: startPos - windowWidth - 15, behavior: 'smooth' })//15px for the margins
      setCurrentDate(current => new Date(current).setDate(currentDateDate - 1))
    }
    else if (change < -windowWidth / 3) {
      currentTarget.scroll({ left: startPos + windowWidth + 15, behavior: 'smooth' })//15px for the margins
      setCurrentDate(current => new Date(current).setDate(currentDateDate + 1))
    }
    else currentTarget.scroll({ left: startPos, behavior: 'smooth' })
  }

  const [render, setRender] = useState([]);

  useEffect(() => {
    const timeline = document.getElementsByClassName("timeline")[0];
    const currentScroll = timeline.scrollLeft;
    getRender(data, today).then(render => {
      setRender(render);
      const todayItem = document.getElementsByClassName(`sign_zipcode_${new Date(startingPoint).setHours(0, 0, 0, 0)}`)[0];
      timeline.scrollLeft = todayItem ? todayItem.offsetLeft : currentScroll;
      setCurrentDate(new Date(startingPoint).setHours(0, 0, 0, 0))
    })
  }, [data, startingPoint])

  return <Section onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} show={show} className="timeline">
    {render}
  </Section>
};

export default ListPerDayView;

