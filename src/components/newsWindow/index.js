import React, { useEffect, useState } from "react";
import FinishProfile from "../finishProfile";
import Invites from "../invites";
import Statistics from "../statistics";

const News = React.memo(({ user, userData, reminders }) => {

  let profileFinished = user ? user.profileFinished : true;
  let invites = (userData && userData.invites) || false;
  let hasInvites = invites.invites && userData.invites.invites.length >= 1;

  return (
    <div className="scrollBody" id="newsWindow">
      {/* <div className="newsCounters">
        <a className="counter wallItem">
          <div className="icon" />
          <div className="number">0</div>
          <div className="text name">Vandaag</div>
        </a>
        <a className="counter wallItem">
          <div className="icon" />
          <div className="number">0</div>
          <div className="text name">Alle</div>
        </a>
      </div> */}
      <div className="text" style={{ marginBottom: "10px", textAlign: "left", width: "90%", fontWeight: "800" }}>Volgende activiteit</div>
      <a className="card counter wallItem">
        <div className="icon" />
        <div className="text name">Deadline Nederlands PO3</div>
      </a>

      {profileFinished || <FinishProfile />}
      {hasInvites ? <Invites input={userData && invites} /> : <div />}


      <img className="card wallItem" src="https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80">
      </img>

      <div className="text" style={{ margin: "10px 0", textAlign: "left", width: "90%", fontWeight: "800" }}>Recent gebruikt</div>
      <a className="card counter wallItem">
        <div className="icon" />
        <div className="text name">MLA Rooster</div>
      </a>
      <a className="card counter wallItem">
        <div className="icon" />
        <div className="text name">Visvalk</div>
      </a>
      <a className="card counter wallItem">
        <div className="icon" />
        <div className="number">9</div>
        <div className="text name">Alle</div>
      </a>





    </div>
  );
})

export default News;
