import React from "react";
import "./style.css";

const Members = props => {
  const history = props.history;
  const closeCard = () => {
    history.goBack();
  };
  return (
    <div className="screen setting">
      members
      <div className="applyBar">
        <div className="bigColorBtn" onClick={closeCard}>
          Wijzig
        </div>
      </div>
    </div>
  );
};
export default Members;
