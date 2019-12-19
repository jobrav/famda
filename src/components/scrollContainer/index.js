import React from "react";
import AddBtn from "../buttons/add";
import "./icons/sports.svg";

const scrollItem = data => {
  const caption = data.caption;
  const name = data.title;
  const id = data.id;
  const theme = data.theme;

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }
  const createColor = input => {
    let color = input;
    let output = {
      start: color < 200 ? color + 15 : color - 15,
      end: color < 200 ? color + 50 : color - 5
    };
    return output;
  };

  const background = {
    backgroundImage: `linear-gradient(
      0,
      rgb(${createColor(hexToRgb(theme).r).start},${
      createColor(hexToRgb(theme).g).start
    },${createColor(hexToRgb(theme).b).start}),
      rgb(${createColor(hexToRgb(theme).r).end},${
      createColor(hexToRgb(theme).g).end
    },${createColor(hexToRgb(theme).b).end})
    )`
  };

  const onChange = e => {
    // console.log(
    //   e,
    //   e.state
    //     ? `${id} is added to your libary`
    //     : `${id} is removed from your libary`
    // );
  };

  return (
    <div style={background} className="scrollItem" key={id}>
      <div className="icon" />
      <div className="subTitle">{name}</div>
      <div className="text">{caption}</div>
      <AddBtn onChange={onChange} />
    </div>
  );
};

function ScrollContainer(props) {
  let data = props.data;
  let amount = props.amount || false;

  return (
    <div className="scrollContainer">
      {data.map((e, i) => {
        if (!amount || amount >= i + 1) {
          return scrollItem(e);
        }
      })}
    </div>
  );
}

export default ScrollContainer;
