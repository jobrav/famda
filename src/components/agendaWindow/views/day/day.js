import React, { useReducer, useState, useEffect } from "react";
import { Chunk } from "../../../../func/chunkItem"
import Appointment from "./appointment"
import Event from "./event";
import Sign from "./sign";
let storage = 0;

const DayView = React.memo(({ source, startingPoint }) => {

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
        let bucket = [];
        renderList.forEach(obj => {
          // let docData = docdata();
          let metaData = obj;
          // let metaData = docData && docData[obj.id];

          const emptyday = (zipcode, i) => {
            let data = metaData && metaData.date;
            data.zipcode = zipcode
            bucket.push(
              <Sign
                key={`${i}_${zipcode}_sign_empty`}
                zipcode={new Date(zipcode).setHours(0, 0, 0, 0)}
                input={data || null}
              />
            );
            bucket.push(
              <div key={`${i}_${zipcode}_whole_day_empty`} className="container_whole_day" />
            )
            bucket.push(
              <div key={`${i}_${zipcode}_container_day_empty`} className="container_day" />
            )
          }


          // let start = prev || obj.zipcode;
          // let end = obj.zipcode;
          // let diff = new Date(end).setHours(0, 0, 0, 0) - new Date(start).setHours(0, 0, 0, 0)
          // let oneDay = 1000 * 60 * 60 * 24;
          // let prox = Math.floor(diff / oneDay);
          // let offset = prox < 30 ? prox : 0;

          // for (let i = 1; i <= offset - 1; i++) {
          //   let datenow = new Date(start).getDate()
          //   let zipcode = new Date(start).setDate(datenow + i);
          //   emptyday(zipcode, i)
          // }


          //today
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
            bucket.push(
              <div key={`${obj.zipcode}_whole_day`} className={`container_whole_day`}>
                {eventBucket}
              </div>
            )
            bucket.push(
              <div key={`${obj.zipcode}_container_day`} className="container_day">
                {dayBucket}
              </div>
            )
            dayBucket = []
            eventBucket = []
          }
          prev = obj.zipcode
          storage = obj.zipcode;
          let beforeToday =
            new Date(today).setHours(0, 0, 0, 0) >
            new Date(obj.zipcode).setHours(0, 0, 0, 0);
          // feed or no feed
          if (metaData && (metaData.feed || metaData.fullDay == false)) {
            dayBucket.push(
              <Appointment
                key={`${obj.zipcode}_${obj.id}_apm`}
                beforeToday={beforeToday}
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
  const [render, setRender] = useState([]);
  const [renderTime, setRenderTime] = useState(0);

  useEffect(() => {
    setRenderTime(prev => prev++) // add rendertime

    const timeline = document.getElementsByClassName("timeline")[0]; // get timeline container
    const currentScroll = timeline.scrollLeft; // get current scroll from left

    getRender(data, today).then(render => { // create render
      setRender(render); //push render
      const startItem = document.querySelectorAll(`[sign-date="${new Date(startingPoint).setHours(0, 0, 0, 0)}"]`)[0]; // get today element
      timeline.scrollLeft = startItem ? startItem.offsetLeft : currentScroll; // scroll to startingpoint or fix scroll bug
    })

  }, [data, startingPoint])


  return <div className="dayView view">
    <div className="timetable">
      <p className="text">hele dag</p>
      <p className="text">1</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">2</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">3</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">4</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">5</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">6</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">7</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">8</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">9</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">10</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">11</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">12</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">13</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">14</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">15</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">16</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">17</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">18</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">19</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">20</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">21</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">22</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">23</p>
      <div></div>
      <div></div>
      <div></div>
      <p className="text">24</p>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="timeline" key="timeline">{render}</div>
    <Chunk startZipcode={AminView} endZipcode={AmaxView} sources={source} setRender={setData} />
    <Chunk startZipcode={BminView} endZipcode={BmaxView} sources={source} setRender={setData} />
  </div>
});

export default DayView;
