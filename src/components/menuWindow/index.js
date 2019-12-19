// import React from "react";
import React, { useEffect } from "react";
import sbs from "../slideBackSpace";

function Menu(props) {
  const match = props.match;
  const history = props.history;

  useEffect(() => {
    const setup = () => {
      const obj = document.getElementsByClassName("slideScreen")[0];
      sbs(history, obj);
    };
    setup();
  }, []);

  // functions

  // close infocard: go to prev url
  const closeCard = props => {
    history.goBack();
  };

  return (
    <div className="slideScreen" key="infoCard">
      <div className="activityBody">
        <div className="toolHeader">
          <div className="subTitle headerCancel" onClick={closeCard}>
            Annuleer
          </div>
          <div className="headerHandle" />

          {/* <div className="subTitle headerAdd">Wijzig</div> */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
