import React from "react";
// import "./style.css";
// import ListContainer from "../listContainer";

function Todo(props) {
  let title = props.title;
  let data = props.data;
  let showAll = true;

  const Button = done => {
    return (
      <div
        style={{ background: done && "#007aff" }}
        key={`reminderBtn_${Math.random()}`}
        className="reminderBtn"
        onClick={e => {
          e.currentTarget.style.background = "#007aff";
        }}
      />
    );
  };

  return (
    <div className="feedContainer" key={`${title}_reminders`}>
      <div className="mediumTitle">{title}</div>
      {data.doc.map(e => {
        return (
          (showAll || !e.done) && (
            <div className="reminder" key={`${e.title}_reminder`}>
              {Button(e.done)}
              <div
                key={`${e}_reminder_obj`}
                className="subTitle"
                style={{ marginLeft: "5vw" }}
              >
                {e.title}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default Todo;
