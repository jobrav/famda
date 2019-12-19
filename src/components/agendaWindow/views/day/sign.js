import React from "react";

const week = [
  "Ma.",
  "Di.",
  "Wo.",
  "Do.",
  "Vr.",
  "Za.",
  "Zo.",
];
const Sign = props => {
  const date = new Date();
  const tmm = date.getMonth();
  const tdd = date.getDate();
  let classType = "sign_day";
  let extraSign = [];
  const Newdate = new Date(props.zipcode);
  const NewdateMonth = Newdate.getMonth();
  const NewdateWeek = Newdate.getDay();
  const NewdateDay = Newdate.getDate();
  const NewdateYear = Newdate.getFullYear();

  if (tmm === NewdateMonth && tdd === NewdateDay) classType = "sign_day today";

  // prevDate = props.input || {
  //   mm: NewdateMonth,
  //   dd: NewdateDay,
  //   yy: NewdateYear
  // };
  return (
    <div
      key={`${classType} ${props.zipcode}`}
      className={classType}
      data-sign={"type" in props && props.type}
      data-date={props.zipcode}
    >{`${week[NewdateWeek]} ${NewdateDay}`}</div>
  );
};

export default Sign;
