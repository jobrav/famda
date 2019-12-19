import React, { useState } from "react";
import "./style.css";
// icons
import "./accept.svg";
import "./tick.svg";

function AcceptBtn(props) {
  const [state, setState] = useState(false);

  const clicked = () => {
    state ? setState(false) : setState(true);
  };

  props.onChange({ state, type: "accept" });

  return (
    <div className="acceptBtn button" onClick={clicked}>
      <div className={state ? "succeedIcon" : "acceptIcon"} />
    </div>
  );
}

export default AcceptBtn;
