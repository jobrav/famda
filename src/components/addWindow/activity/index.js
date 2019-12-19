import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { Link, Route } from "react-router-dom";
import { docdata } from "../../../func/fetch";

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

const AddActivity = props => {
  const db = firebase.firestore();

  useEffect(() => {
    const setup = () => {
      const obj = document.getElementsByClassName("slideScreen")[0];
      sbs(history, obj);
    };
    setup();
  }, []);

  const history = props.history;
  const edit = props.match.params["id"];
  const docData = edit && docdata()[edit];
  const data = docData || {};
  const closeCard = () => {
    if (name) (edit || window.confirm("Annuleren")) && history.goBack();
    else history.goBack();
  };
  const [name, setName] = useState(data.title || "");
  const [adress, setAdress] = useState(data.adress || "");
  const [members, setMembers] = useState(null);
  const [calendars, setCalendars] = useState(data.origin || null);
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
        .then(_ => history.goBack());
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
    <div className="slideScreen">
      <Route path="/add/activity/members" component={Members} />
      <Route path={"/add/activity/adress"} component={Adress} />
      <Route path={"/add/activity/calendars"} component={Calendars} />
      <Route path={"/add/activity/repeat"} component={Repeat} />
      <Route path={"/add/activity/travel_time"} component={TravelTime} />
      <Route path={"/add/activity/alert"} component={Alert} />
      <Route
        exact
        path={[
          "/add/activity",
          "/add/activity/:id",
          "/news/add/activity",
          "/news/add/activity/:id"
        ]}
        render={() => {
          return (
            <div className="activityBody addBody">
              <div className="toolHeader">
                <div className="subTitle headerCancel" onClick={closeCard}>
                  Annuleer
                </div>
                <Link to="/add/menu" replace className="headerItem">
                  <div className="subTitle headerTitle">Activiteit</div>
                  <Layers className="headerIcon" />
                </Link>
                <div
                  className="subTitle headerAdd"
                  style={{ color: name ? "#007aff" : "#19191996" }}
                  onClick={submit}
                >
                  {edit ? "Wijzig" : "Voeg toe"}
                </div>
              </div>
              <div className="formBody">
                <div className="section">
                  <TextInput
                    onChange={change}
                    placeholder="Naam"
                    value={name}
                    name="name"
                  ></TextInput>
                  <TextInput
                    onChange={change}
                    placeholder="Adress"
                    value={adress}
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

                <div className="section">
                  <BooleanInput
                    onChange={change}
                    class="Hele-dag"
                    placeholder="On"
                    value={fullDay}
                    name="fullDay"
                  ></BooleanInput>
                  <DateInput
                    fullDay={fullDay}
                    onChange={change}
                    class="Start"
                    value={zipcode}
                    name="zipcode"
                  ></DateInput>
                  <DateInput
                    fullDay={fullDay}
                    offset={20}
                    onChange={change}
                    class="Eind"
                    value={zipcodeEnd}
                    name="zipcodeEnd"
                  ></DateInput>
                  <ButtonInput
                    link="repeat"
                    onChange={change}
                    class="Herhalen"
                    placeholder="Nooit"
                    value={repeat}
                    name="repeat"
                  ></ButtonInput>
                  {fullDay || (
                    <ButtonInput
                      link="travel_time"
                      onChange={change}
                      class="Reistijd"
                      placeholder="Geen"
                      value={travelTime}
                      name="travelTime"
                    ></ButtonInput>
                  )}
                </div>
                <div className="section">
                  <ButtonInput
                    link="alert"
                    onChange={change}
                    class="Melding"
                    placeholder="Geen"
                    value={alert}
                    name="alert"
                  ></ButtonInput>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
export default AddActivity;
