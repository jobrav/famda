import React, { useEffect, useState } from "react";
import ScrollContainer from "../scrollContainer";

function ExploreCalendars(props) {
  useEffect(() => {
    const setup = () => {};
    setup();
  }, []);

  const data = props.fetch;

  return (
    <div className="feedContainer">
      <div className="mediumTitle">{props.title}</div>
      <ScrollContainer data={data} />
    </div>
  );
}

export default ExploreCalendars;
