import React, { useState } from "react";
import Header from "../header";
import SearchBar from "../searchBar";
import SearchBody from "../searchBody";
import SearchFeed from "../searchFeed";

function Search(props) {
  const route = props.route;
  let path = route.location.pathname == "/search/add";
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  const onChange = e => {
    setValue(e.val);
    setFocus(e.state);
  };

  return (
    <div className={`screen ${path ? "hidden" : "default"}`}>
      <Header title="Zoeken" user={props.user}></Header>

      <SearchBar onChange={onChange} />

      {focus || value != "" ? <SearchBody searchVal={value} /> : <SearchFeed />}
    </div>
  );
}

export default Search;
