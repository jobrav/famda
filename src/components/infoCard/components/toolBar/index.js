// styling
import { Link } from "react-router-dom";
import React from "react";
import "./style.css";

const ToolBar = props => {
  const docID = props.docID;
  return (
    <div id="toolBar">
      <div className="line" />

      <Link to={`/edit/${docID}`} id="edit" className="action_btn">
        <div className="icon" />
        <div className="text">Wijzig</div>
      </Link>

      <Link to={`/card/${docID}/share`} id="share" className="action_btn">
        <div className="icon" />
        <div className="text">Deel</div>
      </Link>
      <div className="line" />
    </div>
  );
};

export default ToolBar;
