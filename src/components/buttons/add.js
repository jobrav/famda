import React, { useState } from "react";
import "./style.css";
// icons
import "./add.svg";
import "./tick.svg";

function AddBtn(props) {
  const [state, setState] = useState(false);

  const clicked = () => {
    state ? setState(false) : setState(true);
  };

  props.onChange({ state, type: "add" });

  return (
    <div className="addBtn button" onClick={clicked}>
      <div className={state ? "succeedIcon" : "addIcon"} />
    </div>
  );
}

export default AddBtn;
