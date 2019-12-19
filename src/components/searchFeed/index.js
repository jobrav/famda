import React, { useEffect, useState } from "react";
import ExploreCalendars from "../exploreCalendars";

const SearchFeed = ({ srchCntx }) => {
  return (
    <div className="scrollBody" id="searchFeed">
      <a className="card counter wallItem">
        <div className="text name">"{srchCntx}"</div>
      </a>
      {/* <div className="newsCounters"> */}
      <a className="counter card wallItem">
        {/* <div className="icon" /> */}
        <div className="text name full">Maak afspraak</div>
      </a>
      <a className="counter card wallItem">
        {/* <div className="icon" /> */}
        <div className="text name full">Maak kalendar</div>
      </a>
      {/* </div> */}
    </div>
  );
}

export default SearchFeed;
