import React, { useEffect, useState } from "react";
import { Chunk } from "../../../../func/chunkItem"
import Appointment from "./appointment";
import Event from "./event";
import Sign from "./sign";
let storage = 0;

const ListView = ({ onChange, source, startingPoint }) => {

  const today = new Date().setHours(0, 0, 0, 0)
  const AminView = new Date(today).setMonth(new Date(today).getMonth() - 1);
  const AmaxView = new Date(today).setHours(23, 59, 59, 99)
  const BminView = new Date(today)
  const BmaxView = new Date(AmaxView).setMonth(new Date(today).getMonth() + 1);

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
                zipcode={today.setHours(0, 0, 0, 0)}
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

  const [data, setData] = useState({})
  const [render, setRender] = useState([]);
  useEffect(() => {
    const timeline = document.getElementsByClassName("timeline")[0];
    const currentScroll = timeline.scrollTop;
    getRender(data, today).then(render => {
      setRender(render);
      const todayItem = document.querySelectorAll(`[sign-date="${new Date(startingPoint).setHours(0, 0, 0, 0)}"]`)[0];
      timeline.scrollTop = todayItem ? todayItem.offsetTop : currentScroll;
    })
  }, [data, startingPoint])

  return <div className="listView view">
    <div className="timeline">
      {render}
    </div>
    <Chunk startZipcode={AminView} endZipcode={AmaxView} sources={source} setRender={setData} />
    <Chunk startZipcode={BminView} endZipcode={BmaxView} sources={source} setRender={setData} />
  </div>
};

export default ListView;

