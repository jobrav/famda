// styling
import React from "react";
import "./style.css";

const Location = props => {
  const country = props.data.country;
  const city = props.data.city;
  const zipcode = props.data.zipcode;
  const street = props.data.street;
  const number = props.data.number;
  return (
    <div id="location" className="content">
      <div className="subTitle title">Adres</div>
      <div className="street">{`${street} ${number}`}</div>
      <div className="adress">{`${zipcode}, ${city}`}</div>
      <div className="country">{`${country}`}</div>
    </div>
  );
};

export default Location;
