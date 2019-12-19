import React from "react";
import { ReactComponent as ArrowR } from "./arrowRight.svg";
import { Link } from "react-router-dom";

const ButtonInput = props => {
  let context;
  let input = props.value || props.placeholder;

  let id = props.name;
  props.onChange(input, id);

  return (
    <Link
      // to={location => `${location.pathname}/${props.link}`}
      to={`${props.link}`}
      className="activityInput"
    >
      <div className="class">{props.class}</div>
      <div style={{ color: !context && "#C7C7CC" }} className="placeholder">
        {input}
      </div>
      <ArrowR className="arrow"></ArrowR>
    </Link>
  );
};
export default ButtonInput;
