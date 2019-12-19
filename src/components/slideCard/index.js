import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import sbs from "../slideBackSpace";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import InfoCard from "../infoCard";
import Menu from "../menuWindow";
import AddActivity from "../addWindow/activity";
import AddCalendar from "../addWindow/calendar";
import AddMenu from "../addWindow/menu";

const SlideCard = props => {
  const db = firebase.firestore();

  const closeCard = () => {
    history.goBack();
  };

  useEffect(() => {
    const setup = () => {
      const obj = document.getElementsByClassName("slideScreen")[0];
      obj && sbs(history, obj);
    };
    setup();
  }, []);

  const history = props.history;
  const editCalendarLinks = [
    "/add/calendar",
    "/add/calendar/:id",
    "/news/add/calendar",
    "/news/add/calendar/:id",
    "/docs/add/calendar",
    "/docs/add/calendar/:id"
  ];
  const editActivityLinks = [
    "/add/activity",
    "/add/activity/:id",
    "/news/add/activity",
    "/news/add/activity/:id",
    "/docs/add/activity",
    "/docs/add/activity/:id"
  ];
  const editMenuLinks = ["/add/menu", "/news/add/menu", "/docs/add/menu"];

  return (
    <div className="slideScreen">
      <Route exact path={editActivityLinks} component={AddActivity} />
      <Route exact path={editCalendarLinks} component={AddCalendar} />
      <Route exact path={editMenuLinks} component={AddMenu} />
      <Route exact path={"/card/:id"} component={InfoCard} />
      <Route exact path={["/menu", "/menu/:id"]} component={Menu} />
    </div>
  );
};
export default SlideCard;
