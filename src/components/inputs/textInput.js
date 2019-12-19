import React, { useState } from "react";
import { ReactComponent as Delete } from "./close.svg";

const ButtonInput = props => {
  const [value, setValue] = useState(props.value);
  const [focus, setFocus] = useState(false);

  const change = e => {
    setValue(e.currentTarget.value || props.value);
  };
  const clear = e => {
    let obj = e.currentTarget;
    let input = obj.previousSibling;
    input.value = "";
    setValue("");
  };

  let id = props.name;
  props.onChange(value, id);

  return (
    <div className="activityInput">
      <input
        onChange={change}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={props.value}
        placeholder={props.placeholder}
        className="text"
      />
      {focus && value && <Delete onTouchStart={clear} className="close" />}
    </div>
  );
};
export default ButtonInput;
