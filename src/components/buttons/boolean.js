import React, { useState } from "react";

function Boolean(props) {
  const [state, setState] = useState(props.value || false);

  const clicked = () => {
    state ? setState(false) : setState(true);
  };

  props.onChange(state);

  let padding = {
    paddingRight: state || "20px",
    background: state && "#4CD964",
    border: state && "#4CD964 2.5px solid",
    paddingLeft: state && "20px"
  };

  return (
    <div style={padding} className="boolean" onClick={clicked}>
      <div className="circle"></div>
    </div>
  );
}

export default Boolean;
