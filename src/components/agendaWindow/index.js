import React, { useEffect, useState } from "react";
import Loader from "../loader";
import autoLoader, { chunks, chunkBorder } from "../../func/autoLoader";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { userdata } from "../../func/loadUser";
import ListView from "./views/list/list";
import DayView from "./views/day/day";
import WeekView from "./views/week";
import MonthView from "./views/month";
import "./style.css";
import { resolve } from "q";

const today = new Date();
const mm = today.getMonth();

let renderList = [];
const refresh = _ => {
  // renderListView(renderList, today, true);
};

export const concatChunks = _ => {
  let bucket = [];
  chunkBorder.forEach(chunk => {
    let id = `${chunk.minView}_${chunk.maxView}`;
    bucket = bucket.concat(chunks[id].getRender())
  });
  renderList = bucket;
  refresh();
};

const Agenda = React.memo(({ route, view, source, listArr, startingPoint }) => {

  const [update, setUpdate] = useState(false);
  useEffect(_ => {
    setTimeout(_ => {
      chunkBorder && concatChunks();
      let body = document.getElementsByClassName("render")[0];
      setTimeout(() => {
        let elm = document.getElementsByClassName("today")[0];
        elm && moveToday(elm, body);
      }, 100);
    }, 1000)
  }, []);

  const moveToday = (elm, body) => {
    let offset = elm.offsetTop;
    body.scrollTo(0, offset);
  };

  const onChange = (entries) => {
    return new Promise(() => {
      if (update === false && chunkBorder[0]) {
        const bottom = entries[0].target.id == "bottom" ? true : false;
        let chunkBorderBottom = bottom ? chunkBorder[0] : chunkBorder[chunkBorder.length - 1];
        let startRequest = bottom ? chunkBorderBottom.minView : chunkBorderBottom.maxView;
        let sourceGroup = source;
        // autoLoader(sourceGroup, startRequest, bottom).then(val => {
        //   concatChunks();
        //   setUpdate(false);
        //   console.log(val);
        //   resolve(true);
        // });
      } else resolve(true)
    })
  }




  let match = route.match;
  let path = match.path != match.url;
  let infocard = match.path == "/card/:id";

  return (
    <div
      id="agendaWindow"
      key="agendaWindow"
      className={`screen ${false ? "hidden" : "default"}`}
    >
      <div className="render" key="render">
        <div id="top" />
        {renderList ? (
          <TransitionGroup component={null}>
            <CSSTransition
              key={route.location.pathname}
              timeout={150}
              classNames="zoom"
            >
              <Switch location={route.location}>
                {view === listArr[0] && <ListView startingPoint={startingPoint} source={source} onChange={onChange} />}
                {view === listArr[1] && <DayView startingPoint={startingPoint} source={source} onChange={onChange} />}
                {view === listArr[2] && <WeekView source={source} onChange={onChange} />}
                {view === listArr[3] && <MonthView source={source} onChange={onChange} />}
              </Switch></CSSTransition></TransitionGroup>
        ) : <Loader key="Loader" />}
        <div id="bottom" />
      </div>
    </div>
  );
});

export default Agenda;
