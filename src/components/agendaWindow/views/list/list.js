import React, { useReducer, useState } from "react";
import { Chunk } from "../../../../func/chunkItem"
import Appointment from "./appointment";
import Event from "./event";
import Sign from "./sign";
let storage = 0;

const ListView = ({ onChange, source }) => {

  const [update, setUpdate] = useState("");
  let i = 0;
  const change = () => {
    setTimeout(() => { setUpdate(i); i += 1 }, 100)
  }

  const initialState = {};

  function reducer(state, action) {
    switch (action.type) {
      case 'change':
        change()
        state[action.id] = action.content
        return state;
      default:
        return state;
    }
  }
  const [render, dispatch] = useReducer(reducer, initialState);
  const today = new Date()

  const getRender = (render, today) => {
    const chunkList = Object.values(render)
    return chunkList ? chunkList.map(renderList => {
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
  }

  return <div className="listView view">
    {getRender(render, today)}
    <Chunk startZipcode={1571954400000} endZipcode={1577228399099} sources={source} dispatch={dispatch} />
    <Chunk startZipcode={1577228400000} endZipcode={1582585199099} sources={source} dispatch={dispatch} />
  </div>
};

export default ListView;

