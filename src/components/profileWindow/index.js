import React, { useEffect, useState } from "react";
import Header from "../header";
const Profile = props => {
  let userData = props.user;
  let path = props.route.location.pathname == "/profile/add";
  return (
    <div className={`screen ${path ? "hidden" : "default"}`}>
      <Header title="Profiel" user={props.user}></Header>
    </div>
  );
};
export default Profile;
