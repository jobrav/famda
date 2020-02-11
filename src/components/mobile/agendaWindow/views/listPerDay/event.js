import React from "react";
import { Link } from "react-router-dom";
// import { activate } from "./../infoCard";
const Event = props => {
  const activity = props.data;
  return (
    <Link
      to={{
        pathname: "/view/card",
        state: activity
      }}
      className="event"
      key={`${activity.id}_${props.zipcode}_obj`}
      data-key={activity.id}
      data-zipcode={props.zipcode}
    >
      <div className="evtTitle">{props.data.title}</div>
    </Link>
  );
};

export default Event;
