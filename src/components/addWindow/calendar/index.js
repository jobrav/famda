import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";

import ButtonInput from "../../inputs/buttonInput";
import TextInput from "../../inputs/textInput";
import DateInput from "../../inputs/dateInput";
import BooleanInput from "../../inputs/booleanInput";
import Adress from "../../inputs/components/adress";
import Members from "../../inputs/components/members";
import Calendars from "../../inputs/components/calendars";
import Repeat from "../../inputs/components/repeat";
import TravelTime from "../../inputs/components/travelTime";
import Alert from "../../inputs/components/alert";
import { ReactComponent as Layers } from "../layers.svg";
import sbs from "../../slideBackSpace";
const AddCalendar = props => {
  const db = firebase.firestore();

  const closeCard = () => {
    history.goBack();
  };

  useEffect(() => {
    const setup = () => {
      const obj = document.getElementsByClassName("slideScreen")[0];
      sbs(history, obj);
    };
    setup();
  }, []);

  const history = props.history;
  const data = props.data || {};

  const [name, setName] = useState(data.name);
  const [adress, setAdress] = useState(data.adress || null);
  const [members, setMembers] = useState(data.members || null);
  const [calendars, setCalendars] = useState(data.calendars || null);
  const [fullDay, setFullDay] = useState(data.fullDay || false);
  const [zipcode, setZipcode] = useState(data.zipcode || new Date().valueOf());
  const [zipcodeEnd, setZipcodeEnd] = useState(
    data.zipcodeEnd || new Date().valueOf()
  );
  const [travelTime, setTravelTime] = useState(data.travelTime || null);
  const [repeat, setRepeat] = useState(data.repeat || null);
  const [alert, setAlert] = useState(data.alert || null);

  const submit = () => {
    if (name && (members || calendars)) {
      let startDate = new Date(zipcode);
      let endDate = new Date(zipcodeEnd);
      let startTime = [startDate.getHours(), startDate.getMinutes()];
      let endTime = [endDate.getHours(), endDate.getMinutes()];

      let doc = {
        title: name,
        creator: { name: "Jochem van der Valk", uid: "dfsjesljk" },
        members: [{ name: "Jochem van der Valk", uid: "dfsjesljk" }],
        feed: `Locatie: ${adress || ""}`,
        edit: true,
        theme: "#1C1EFF",
        origin: "aF9Q50r4wDWlieR4ESrv",
        repeat: false,
        time: { end: endTime, start: startTime },
        startTime: `${startTime[0]}:${startTime[1]}`,
        endTime: `${endTime[0]}:${endTime[1]}`,
        timestamp: new Date(),
        fullDay: fullDay,
        zipcode: zipcode,
        zipcodeEnd: zipcodeEnd
      };

      db.collection("calendars")
        .doc("aF9Q50r4wDWlieR4ESrv")
        .collection("activityIndex")
        .add(doc)
        .then(ref => {
          // console.log("Added document with ID: ", ref.id);
          history.goBack();
        });
    }
  };

  const change = (value, name) => {
    name === "name" && setName(value);
    name === "adress" && setAdress(value);
    name === "members" && setMembers(value);
    name === "calendars" && setCalendars(value);
    name === "fullDay" && setFullDay(value);
    name === "zipcode" && setZipcode(value);
    name === "zipcodeEnd" && setZipcodeEnd(value);
    name === "travelTime" && setTravelTime(value);
    name === "repeat" && setRepeat(value);
    name === "alert" && setAlert(value);
  };

  return (
    // <BrowserRouter>
    //   <Route path={"/adress"} component={Adress} />
    //   <Route path="/members" component={Members} />
    //   <Route path={"/calendars"} component={Calendars} />
    //   <Route path={"/repeat"} component={Repeat} />
    //   <Route path={"/travelTime"} component={TravelTime} />
    //   <Route path={"/alert"} component={Alert} />
    <div className="slideScreen">
      <div className="activityBody addBody">
        <div className="toolHeader">
          <div className="subTitle headerCancel" onClick={closeCard}>
            Annuleer
          </div>
          <Link to="/add/menu" className="headerItem">
            <div className="subTitle headerTitle">Kalender</div>
            <Layers className="headerIcon" />
          </Link>
          <div
            className="subTitle headerAdd"
            style={{ color: name ? "#007aff" : "#19191996" }}
            onClick={submit}
          >
            Voeg toe
          </div>
        </div>
        <div className="formBody">
          <div className="section">
            <TextInput
              onChange={change}
              placeholder="Naam"
              // value={name}
              name="name"
            ></TextInput>
            <TextInput
              onChange={change}
              placeholder="Adress"
              // value={adress}
              name="adress"
            ></TextInput>
            <ButtonInput
              link="members"
              onChange={change}
              class="Deelnemers"
              placeholder="Jij"
              value={members}
              name="members"
            ></ButtonInput>
            <ButtonInput
              link="calendars"
              onChange={change}
              class="Kalenders"
              placeholder="Privé"
              value={calendars}
              name="calendars"
            ></ButtonInput>
          </div>
        </div>
      </div>
    </div>
    // </BrowserRouter>
  );
};
export default AddCalendar;
