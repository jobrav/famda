import React from "react";
import { ReactComponent as Icon } from "./search.svg";
import { ReactComponent as Close } from "./close.svg";
import "./style.css";


const SearchBar = React.memo(({ srchCtx, changeSrchCtx }) => {
  const clear = e => {
    e.currentTarget.previousSibling.value = ""
    changeSrchCtx("")
  }
  return (
    <div id="searchBar">
      <div
        id="searchBox"
        style={{ gridColumn: "2/4" }}
      >
        <Icon id="searchIcon" />
        <input
          type="text"
          id="searchInput"
          placeholder="Zoeken"
          onChange={e => changeSrchCtx(e.currentTarget.value)}
        />
        {srchCtx ? <Close id="cancelIcon" onClick={clear} /> : null}
      </div>
    </div>
  );
})
export default SearchBar
