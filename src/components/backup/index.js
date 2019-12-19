import React, { useEffect, useState } from "react";
import fetchData, { orderedList } from "../../func/fetch";
import renderWindow from "../../func/render/agdRender.js";
import GroupSlider from "../groupSlider";

import "./style.css";

function Agenda(props) {
  let path = props.location.pathname == "/add";
  const [fetch, setFetch] = useState(orderedList);
  const [current, setCurrent] = useState("alles");
  const [renderList, setRenderList] = useState([]);

  useEffect(() => {
    setFetch(orderedList);
    const setUp = () => {
      fetchData(current);

      // document
      //   .getElementById("agendaWindow")
      //   .addEventListener("scroll", checkScroll);
    };
    setUp();
  }, []);

  // setTestList(orderedList);
  // console.log(renderList, RBucket, RTree, GBucket, status);

  let activeIndex = 0;
  const checkScroll = e => {
    // scroll measerd from top
    let scrollTop = e.target.scrollTop;

    // current and next sign
    let current = document.getElementsByClassName("sign")[activeIndex];
    let next = document.getElementsByClassName("sign")[activeIndex + 1];
    let currOff = current.parentElement.parentElement.offsetTop;
    let currHeight = current.parentElement.offsetHeight;
    let nextOff = next.parentElement.parentElement.offsetTop;

    // transform sign
    if (currHeight + scrollTop <= nextOff) {
      current.style.position = `fixed`;
      current.style.top = `0`;
    } else {
      current.style.position = `relative`;
      current.style.top = `${nextOff - currOff - currHeight}px`;
    }
    // change moving sign
    if (scrollTop >= nextOff) activeIndex += 1;
    if (scrollTop <= currOff && activeIndex != 0) {
      activeIndex -= 1;
      current.style = "";
    }
  };
  // console.log(orderedList, GBucket, RBucket, RTree);
  const createRender = () => {
    console.log(orderedList);
    orderedList.forEach(data => {
      let render = renderWindow(data);
      renderList.push(render);
      // console.log(renderList);
    });
  };

  const onChange = e => {
    // setCurrent(e.current);
    fetchData(e.current);
    createRender();
  };
  return (
    <div id="agendaWindow" className={path ? "hidden" : "default"}>
      <GroupSlider
        groups={[
          //"volleybal",
          "prive",
          "alles",
          "werk" //, "thuis"
        ]}
        onChange={onChange}
      />
      <div className="render">{renderList}</div>
    </div>
  );
}

export default Agenda;
