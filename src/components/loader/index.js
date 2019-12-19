// styling
import React from "react";
import { ReactComponent as Spinner } from "./loader.svg";

const loaderStyle = {
  width: "40px",
  height: "40px",
  marginLeft: window.innerWidth / 2 - 40 / 2 + "px"
};

const Loader = () => {
  return (
    <div key="loader" className="loader" style={loaderStyle}>
      <Spinner />
    </div>
  );
};

export default Loader;
