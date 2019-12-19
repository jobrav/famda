import React, { useEffect } from "react";
import { ReactComponent as Blocks } from "./blocks.svg";
import "./style.css";

let running = false;
export const actived = (value, head, color) => {
  let obj = document.getElementById("alert");
  obj.children[0].innerText = head;
  obj.children[1].innerText = value;
  if (color) obj.children[1].style.color = color;

  if (running == false) {
    running = true;
    animateIn(obj);
    setTimeout(() => {
      animateOut(obj);
      running = false;
    }, 2000);
  }
};

const animateIn = obj => {
  obj.animate(
    [
      // keyframes
      { padding: "0px 75px 10px 75px", opacity: 0 },
      { padding: "5px 75px 5px 75px", opacity: 1 }
    ],
    {
      // timing options
      duration: 200,
      easing: "ease-in-out",
      fill: "forwards"
    }
  );
};
const animateOut = obj => {
  obj.animate(
    [
      // keyframes
      { padding: "5px 75px 5px 75px", opacity: 1 },
      { padding: "0px 75px 10px 75px", opacity: 0 }
    ],
    {
      // timing options
      duration: 200,
      easing: "ease-in-out",
      fill: "forwards"
    }
  );
};

const Alert = props => {
  useEffect(() => {
    const setup = () => {};
    setup();
  }, []);

  return (
    <div className="body">
      <div id="alert">
        <div className="title">title</div>
        <div className="subtitle">subtitle</div>
      </div>
    </div>
  );
};
export default Alert;
