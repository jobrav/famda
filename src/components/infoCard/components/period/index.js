// styling
import React from "react";
import "./style.css";

const Period = props => {
  let zipstart = props.doc.zipcode ? new Date(props.doc.zipcode) : null;
  let zipend = props.doc.zipcodeEnd ? new Date(props.doc.zipcodeEnd) : null;

  let diffDate =
    zipstart && zipstart.setHours(0, 0, 0, 0) < zipend.setHours(0, 0, 0, 0);

  const weekDays = [
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
    "Zondag"
  ];
  const months = [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December"
  ];

  const startDate =
    zipstart &&
    `${weekDays[zipstart.getDay()]} ${zipstart.getDate()} ${
      months[zipstart.getMonth()]
    }`;

  const endDate =
    zipend &&
    `${weekDays[zipend.getDay()]} ${zipend.getDate()} ${
      months[zipend.getMonth()]
    }`;

  const date = props.doc.date;
  const ww = date && date.ww;
  const mm = date && !date.mm && date.dd;
  const yy = date && date.mm && date.dd;

  const repeatWW = ww != undefined && `Elke ${weekDays[date.ww]} van de week`;
  const repeatMM = mm != undefined && `Elke ${date.dd}e van de maand`;
  const repeatYY = yy != undefined && `${date.dd} ${months[date.mm - 1]}`;

  const startTime = props.doc.startTime;
  const endTime = props.doc.endTime;

  return (
    <div id="date">
      {ww != undefined && <div className="text">{repeatWW}</div>}
      {mm != undefined && <div className="text">{repeatMM}</div>}
      {yy != undefined && <div className="text">{repeatYY}</div>}

      {zipstart && (
        <div className="text">
          {`${diffDate ? "Van" : ""}
       ${startDate}
        ${startTime && diffDate ? startTime : ""}`}
        </div>
      )}

      {diffDate && (
        <div className="text">
          {`tot ${endDate}
         ${startTime && endTime}`}
        </div>
      )}
      {diffDate || !startTime || (
        <div className="text">{`van ${startTime} tot ${endTime}`}</div>
      )}
      {!startTime ? <div className="text">{`Hele dag`}</div> : ""}
    </div>
  );
};

export default Period;
