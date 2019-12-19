import * as firebase from "firebase";
import React, { useEffect, useState } from "react";
import { docdata } from "../../func/fetch";
import Loader from "../loader";
import Period from "./components/period";
import Present from "./components/present";
import Location from "./components/location";
import { Link } from "react-router-dom";
import "./style.css";
import "./share.svg";
import "./edit.svg";
import "./close.svg";
import sbs from "../slideBackSpace";
import autoLoader, { chunks, chunkBorder } from "../../func/autoLoader";

function InfoCard(props) {
  let uid = firebase.auth().currentUser.uid;
  const [body, setBody] = useState([<Loader key="Loader" />]);

  // set props
  const match = props.match;
  const history = props.history;

  useEffect(() => {
    const setup = () => {
      const obj = document.getElementsByClassName("slideScreen")[0];
      sbs(history, obj);
    };
    setup();
  }, []);

  // functions

  // close infocard: go to prev url
  const closeCard = () => {
    history.goBack();
  };

  //pull data for cache
  const docID = match.params.id;
  // let obj = chunks[docID].map[]
  if (!docdata()) closeCard();
  const doc = docdata()[docID] || closeCard();

  const db = firebase.firestore();
  useEffect(() => {
    const setup = () => {
      // document.getElementById("close").addEventListener("click", closeCard);
      // document.getElementById("share").addEventListener("click", share);

      const ref = db
        .collection("calendars")
        .doc(doc.origin)
        .collection("activityIndex")
        .doc(doc.id)
        .collection("backend")
        .doc("E1m2dB86pUoKcP5Tnnsa");

      ref.onSnapshot(doc => {
        const data = doc.data();
        let content =
          data &&
          data.structure.map(e => {
            return loadContent(e, data[e]);
          });
        // console.log(test);
        // setTimeout(() => {
        setBody(content);
        // }, 500);
      });
    };
    setup();
  }, []);
  // const getBackend = elm => {

  // };
  const loadContent = (name, elm) => {
    if (name == "present")
      return <Present className="downloadDone" key="Present" data={elm} />;
    if (name == "location")
      return <Location className="downloadDone" key="Location" data={elm} />;
  };

  return (
    <div className="slideScreen" key="infoCard">
      <div className="activityBody infocard">
        <div className="toolHeader">
          <div className="subTitle headerCancel" onClick={closeCard}>
            Annuleer
          </div>
          <div className="headerHandle" />
          {(doc.edit || doc.creator.id == uid) && (
            <Link
              to={`/add/activity/${match.params.id}`}
              className="subTitle headerAdd"
            >
              Wijzig
            </Link>
          )}
        </div>

        <div id="body">
          <div id="header">
            <div id="content" className="largeTitle">
              {doc ? doc.title : null}
            </div>
            {/* <div id="close" /> */}
            <Period doc={doc} />
          </div>
          {body}
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
