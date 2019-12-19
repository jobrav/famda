import React from "react";
import { Link } from "react-router-dom";
// import { activate } from "./../infoCard";

const Appointment = ({ data, zipcodeEnd, zipcode, beforeToday }) => {
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
  const cs = data.theme || null;
  const appColorStyle = data.theme
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

  const activity = data;
  const fullDay = activity.fullDay;
  const getStartHour = new Date(zipcode).getHours()
  const getEndHour = new Date(data.zipcodeEnd).getHours()

  return (
    <Link
      to={`/card/${activity.id}`}
      className="appointment_day"
      key={`${activity.id}_${zipcode}_obj`}
      data-key={activity.id}
      data-zipcode={zipcode}
      style={{ opacity: beforeToday && 0.8, gridRow: `${getStartHour}/${getEndHour}` }}
    >
      <div
        // style={activity.theme ? appColorStyle : null}
        style={activity.theme ? { background: data.theme } : null}
        className="appType_day"
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