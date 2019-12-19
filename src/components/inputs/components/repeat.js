import React from "react";
import "./style.css";

const Repeat = props => {
  const history = props.history;
  const closeCard = () => {
    history.goBack();
  };
  return (
    <div className="screen setting">
      repeat
      <div className="applyBar">
        <div className="bigColorBtn" onClick={closeCard}>
          Wijzig
        </div>
      </div>
    </div>
  );
};
export default Repeat;
