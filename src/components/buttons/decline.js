import React, { useState } from "react";
import "./style.css";
// icons
import "./decline.svg";
import "./tick.svg";

function DeclineBtn(props) {
  const [state, setState] = useState(false);

  const clicked = () => {
    state ? setState(false) : setState(true);
  };

  props.onChange({ state, type: "decline" });

  return (
    <div className="declineBtn button" onClick={clicked}>
      <div className={state ? "succeedIcon" : "declineIcon"} />
    </div>
  );
}

export default DeclineBtn;
