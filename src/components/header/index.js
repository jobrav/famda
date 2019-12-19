import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  let userData = props.user || undefined;

  return (
    <div className="header">
      <div className="subTitle">{props.title}</div>

      <Link className="pic" to="/profile">
        {userData && (
          <img
            width="25"
            height="25"
            src={`data:image/jpeg;base64,${userData && userData.picture}`}
          ></img>
        )}
      </Link>

      {props.content && <div className="content">{props.content}</div>}
    </div>
  );
};

export default Header;
