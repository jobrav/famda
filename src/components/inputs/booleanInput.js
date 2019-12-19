import React from "react";
import Boolean from "../buttons/boolean";

const BooleanInput = props => {
  let id = props.name;
  const change = value => {
    props.onChange(value, id);
  };

  return (
    <div className="activityInput">
      <div className="class">{props.class}</div>
      <Boolean
        className="boolean"
        value={props.value}
        onChange={change}
      ></Boolean>
    </div>
  );
};
export default BooleanInput;
