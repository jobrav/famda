import React from "react";
import "./style.css";

const Alert = props => {
  const history = props.history;
  const closeCard = () => {
    history.goBack();
  };
  return (
    <div className="screen setting">
      Alert
      <div className="applyBar">
        <div className="bigColorBtn" onClick={closeCard}>
          Wijzig
        </div>
      </div>
    </div>
  );
};
export default Alert;
