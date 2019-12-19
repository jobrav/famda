import React from "react";
import "./style.css";
import { ReactComponent as Arrow } from "../arrow.svg";
import { Link } from "react-router-dom";
const AddMenu = props => {
  const history = props.history;
  const closeCard = () => {
    history.goBack();
  };
  return (
    <div className="slideScreen">
      <div className="addMenu">
        <Link to="activity" replace className="addTemplate">
          <div className="subTitle">Afspraak Standaard</div>
          <div className="text">Maak een nieuwe afspraak van de grond op</div>
          <Arrow className="arrow" />
        </Link>

        <Link to="calendar" replace className="addTemplate">
          <div className="subTitle">Kalender</div>
          <div className="text">
            Maak een nieuwe kalender met je family of vrienden.
          </div>
          <Arrow className="arrow" />
        </Link>

        {/* <div className="toolHeader">
          <div className="headerItem" onClick={closeCard}>
            <div className="subTitle headerTitle">Anulleren</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default AddMenu;
