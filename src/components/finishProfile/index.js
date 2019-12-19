// styling
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const title = {
  gridColumn: "2",
  gridRow: "2",
  justifySelf: "center",
  alignSelf: "center"
};

const acceptBtn = {
  fontSize: "11.5px",
  background: "#007aff",
  color: "white",
  padding: "4px 10px ",
  gridColumn: "2",
  gridRow: "3",
  borderRadius: "15px",
  textAlign: "center",
  alignSelf: "center",
  textTransform: "uppercase",
  fontWeight: 700,
  letterSpacing: "0.25px",
};

const FinishProfile = () => {
  return (
    <a key="finishProfile" className="card wallItem" id="bodyStyle">
      <div style={title} className="text name">
        Je profiel is nog niet compleet
      </div>
      <Link to="/setup" className="action" style={acceptBtn}>
        afmaken
      </Link>
    </a>
  );
};

export default FinishProfile;
