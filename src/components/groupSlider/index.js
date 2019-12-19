import React, { useEffect, useState } from "react";
import "./style.css";

function GroupSlider(props) {
  const [groupObj, setGroupObj] = useState([]);
  const [current, setCurrent] = useState(null);

  props.onChange({ active: current });

  const createObj = (e, i, length) => {
    return (
      <div
        key={`${e}_btn`}
        className={`slideObj ${i < length / 2 ? "left" : "right"}`}
      >
        {e}
      </div>
    );
  };

  let centerObj;
  let obj;
  let center;
  let centerScroll;

  useEffect(() => {
    const setup = () => {
      const group = document.getElementById("groupSlider");
      const groupContainer = document.getElementById("groupSliderContainer");
      const agendaWindow = document.getElementById("agendaWindow");
      const groups = props.groups;

      const setupSlider = () => {
        obj = document.getElementsByClassName("slideObj");
        center = obj && Math.floor(obj.length / 2);
        centerObj = obj[center] && obj[center];
        if (centerObj) {
          centerScroll = centerObj.offsetLeft;
          scrollGroup(centerScroll);
          centerObj.className = "slideObj center";
        }
      };

      const nextGroup = () => {
        obj[center].className = "slideObj left";
        obj[center + 1].className = "slideObj center";
        center++;
        centerObj = obj[center] && obj[center];
        centerScroll = centerObj && centerObj.offsetLeft;
        scrollGroup(centerScroll);
      };

      const prevGroup = () => {
        obj[center].className = "slideObj right";
        obj[center - 1].className = "slideObj center";
        center--;
        centerObj = obj[center] && obj[center];
        centerScroll = centerObj && centerObj.offsetLeft;
        scrollGroup(centerScroll);
      };

      const scrollGroup = amount => {
        let offset = group.offsetWidth / 2 - centerObj.offsetWidth / 2;
        groupContainer.style.transform = `translateX(${-(amount - offset)}px)`;
        groupContainer.style.perspectiveOrigin = `${(100 /
          groupContainer.offsetWidth) *
          amount}% 50%`;
        setCurrent(groups[center]);
      };

      let startingX;
      let startingY;
      const startMove = e => {
        startingX = e.touches[0].clientX;
        startingY = e.touches[0].clientY;
      };

      const endMove = e => {
        let change = e.changedTouches[0].clientX - startingX;
        let changeY = e.changedTouches[0].clientY - startingY;
        if (change < -5 && changeY < 10 && changeY > -10 && obj[center + 1])
          nextGroup();
        if (change > 5 && changeY < 10 && changeY > -10 && obj[center - 1])
          prevGroup();
      };

      agendaWindow.addEventListener("touchstart", startMove);
      agendaWindow.addEventListener("touchend", endMove);

      for (let i = 0; i < groups.length; i++) {
        groupObj.push(createObj(groups[i], i, groups.length));
        setTimeout(() => {
          setupSlider();
        }, 10);
      }
    };
    setup();
  }, []);

  return (
    <div id="groupSlider">
      <div id="groupSliderContainer">{groupObj}</div>
    </div>
  );
}

export default GroupSlider;
