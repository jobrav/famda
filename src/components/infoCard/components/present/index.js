// styling
import React from "react";
import "./style.css";

const Present = props => {
  let presentList = props.data.allPresent;
  let presentUser = props.data.present;
  return (
    <div id="present" className="content">
      <div className="subTitle title">Aanwezig</div>
      <div className="presentList">
        {presentList.map(user => {
          return (
            <div key={user.firstName + user.lastName} className="user">
              <div className="userPf" />
              <div key={user.firstName} className="userFirstName">
                {user.firstName}
              </div>
              <div key={user.lastName} className="userLastName">
                {user.lastName}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ gridColumn: "1/21" }} className="bigColorBtn">
        {presentUser ? "Annuleren" : "Aanmelden"}
      </div>
    </div>
  );
};

export default Present;
