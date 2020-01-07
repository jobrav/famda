import React from "react";
import * as firebase from "firebase";
import "./style.css";
// import ListContainer from "../../../listContainer";

function Invites(props) {
  let invites = props.input && props.input.invites;

  const onChange = e => {
    console.log(e.type, "accept", e.state, true, e, e.data);
    if (e.type === "accept" && e.state === true && e.data.ckey && e.data.cid) {
      let addSource = firebase.functions().httpsCallable("acceptInvite");
      addSource({ doc: e.data })
        .then(e => {
          console.log("added", e);
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <div className="feedContainer wallItem">
      <div className="mediumTitle">Uitnodigingen</div>
      {/* <ListContainer onChange={onChange} amount={2} data={invites} /> */}
    </div>
  );
}

export default Invites;
