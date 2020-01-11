import React from "react";
import { Link } from "react-router-dom";
// import { activate } from "./../infoCard";

const Appointment = props => {
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }
  const cs = props.data.theme || null;
  const appColorStyle = props.data.theme
    ? {
        backgroundImage: `linear-gradient(
        0,
        rgb(${hexToRgb(cs).r + 50},${hexToRgb(cs).g + 50},${hexToRgb(cs).b +
          50}),
        rgb(${hexToRgb(cs).r},${hexToRgb(cs).g},${hexToRgb(cs).b}),
        rgb(${hexToRgb(cs).r + 50},${hexToRgb(cs).g + 50},${hexToRgb(cs).b +
          50})
        )`
      }
    : null;

  const activity = props.data;
  const fullDay = activity.fullDay;
  const beforeToday = props.beforeToday;

  return (
    <Link
      to={`/card/${activity.id}`}
      className="appointment"
      key={`${activity.id}_${props.zipcode}_obj`}
      data-key={activity.id}
      data-zipcode={props.zipcode}
      style={{ opacity: beforeToday && 0.8 }}
    >
      <div key="appTime" className="appTime">
        <div key="appTimeStart" className="appTimeStart">
          {fullDay ? "hele" : activity.startTime}
        </div>
        <div key="appTimeEnd" className="appTimeEnd">
          {fullDay ? "dag" : activity.endTime}
        </div>
      </div>
      <div
        style={activity.theme ? appColorStyle : null}
        className="appType"
        key="appType"
      />
      <div key="appTitle" className="appTitle">
        {activity.title}
      </div>
      <div key="appFeed" className="appFeed">
        {activity.feed}
      </div>
    </Link>
  );
};

export default Appointment;
