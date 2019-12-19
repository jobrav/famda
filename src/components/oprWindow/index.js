import React from "react";
import Header from "../header";
import Todo from "../todo";
import Slider from "../slider";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Operations(props) {
  let user = props.user || false;
  let userData = props.userData || false;
  let reminders = props.reminders || false;
  let profileFinished = user ? user.profileFinished : true;
  let route = props.route;
  let match = route.match;
  let path = `${match.path}/` != match.url;
  let invites = (userData && userData.invites) || false;
  let hasInvites = invites.invites && userData.invites.invites.length >= 1;

  const createReminder = () => {
    let bucket = [];
    let group;
    for (group in reminders) {
      bucket.push(<Todo title={group} key={group} data={reminders[group]} />);
    }
    return bucket;
  };

  return <div id="operationWindow"></div>;
}

export default Operations;
