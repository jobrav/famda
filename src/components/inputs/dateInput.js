import React from "react";

const DateInput = props => {
  let fullday = props.fullDay || false;
  let id = props.name;

  const dateToString = e => {
    const date = new Date(e);
    date.setMonth(date.getMonth() + 1);
    return `${date.getFullYear()}-${
      date.getMonth().toString().length === 2 ? "" : "0"
    }${date.getMonth()}-${
      date.getDate().toString().length === 2 ? "" : "0"
    }${date.getDate()}T${
      date.getHours().toString().length === 2 ? "" : "0"
    }${date.getHours()}:${
      date.getMinutes().toString().length === 2 ? "" : "0"
    }${date.getMinutes()}`;
  };

  let value = props.value
    ? dateToString(props.value)
    : dateToString(new Date());

  const change = elm => {
    let value = elm ? elm.currentTarget.value : props.value;
    let zipcode = new Date(value);
    zipcode.setMonth(zipcode.getMonth() - 1);
    props.onChange(zipcode.valueOf(), id);
  };

  return (
    <div className="activityInput">
      <div className="class">{props.class}</div>
      {fullday ? (
        <input
          className="date"
          onChange={change}
          type="date"
          name="meeting-time"
          value={value.split("T")[0]}
        />
      ) : (
        <input
          className="date"
          onChange={change}
          type="datetime-local"
          name="meeting-time"
          value={value}
        />
      )}
    </div>
  );
};
export default DateInput;
