import React, { useEffect, useState } from "react";
import styled from "styled-components"
import Appointment from "./appointment";
import Event from "./event";
import ViewToolbar from "../../../viewToolbar"
import Sign from "./sign";

let storage = 0;

const Section = styled.div`
height: 100%;
overflow: none;
position: absolute;
width: 100%;
transform-origin: top center;
overflow-x:hidden;
overflow-y:scroll;
background: ${({ theme: { hue, darkMode, gray6 } }) => darkMode ? hue : gray6}
display: ${props => props.show ? null : "none"};
`

const ListView = ({ show, startingPoint, data, listArr }) => {

  const today = new Date().setHours(0, 0, 0, 0)
  const [render, setRender] = useState([]);
  const getRender = (render, today) => {
    return new Promise(resolve => {
      const chunkList = Object.values(render)
      let test = chunkList ? chunkList.map(renderList => {
        return renderList.map(obj => {
          // let docData = docdata();
          let bucket = [];
          let metaData = obj;
          // let metaData = docData && docData[obj.id];

          //today

          if (
            new Date(today).setHours(0, 0, 0, 0) >
            new Date(storage).setHours(0, 0, 0, 0) &&
            new Date(today).setHours(0, 0, 0, 0) <
            new Date(obj.zipcode).setHours(0, 0, 0, 0)
          ) {
            bucket.push(
              <Sign
                key={`${obj.zipcode}_today`}
                zipcode={today}
                input={metaData.date || null}
              />
            );
          }
          if (
            new Date(obj.zipcode).setHours(0, 0, 0, 0) >
            new Date(storage).setHours(0, 0, 0, 0)
          ) {
            bucket.push(
              <Sign
                key={`${obj.zipcode}_sign`}
                zipcode={new Date(obj.zipcode).setHours(0, 0, 0, 0)}
                input={metaData.date || null}
              />
            );
          }
          storage = obj.zipcode;
          let beforeToday =
            new Date(today).setHours(0, 0, 0, 0) >
            new Date(obj.zipcode).setHours(0, 0, 0, 0);
          // feed or no feed
          if (metaData && (metaData.feed || metaData.fullDay == false)) {
            bucket.push(
              <Appointment
                key={`${obj.zipcode}_apm`}
                beforeToday={beforeToday}
                zipcode={obj.zipcode}
                data={metaData}
              />
            );
          } else if (metaData) bucket.push(<Event key={`${obj.zipcode}_evt`} data={metaData} />);
          return bucket;
        });
      }) : null;
      resolve(test)
    })
  }



  useEffect(() => {
    const timeline = document.getElementsByClassName("timeline")[0];
    const currentScroll = timeline.scrollTop;
    getRender(data, today).then(render => {
      setRender(render);
      const todayItem = document.querySelectorAll(`[sign-date="${new Date(startingPoint).setHours(0, 0, 0, 0)}"]`)[0];
      timeline.scrollTop = todayItem ? todayItem.offsetTop : currentScroll;
    })
  }, [data, startingPoint])

  return <Section show={show} className="timeline">
    {render}
  </Section>
};

export default ListView;

