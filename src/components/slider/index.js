import React from "react";
import { Link } from "react-router-dom";
// import "./style.css";
// import ListContainer from "../listContainer";

function Slider(props) {
  let path = props.path;
  let id = path == "/news/" ? true : false;

  return (
    <div className="sliderBody">
      <div
        className="slideBg"
        style={{ transform: `translateX(${id ? 0 : 100}%)` }}
      />
      <Link replace to="/news/" data-id="1" className="slider smallTitle">
        {props.first}
      </Link>
      <Link replace to="/docs/" data-id="2" className="slider smallTitle">
        {props.second}
      </Link>
    </div>
  );
}

export default Slider;
