import React from "react";

const week = [
  "Zo.",
  "Ma.",
  "Di.",
  "Wo.",
  "Do.",
  "Vr.",
  "Za."
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

  return (
    <div
      key={`${classType} ${props.zipcode}`}
      className={classType}
      data-sign={"type" in props && props.type}
      sign-date={props.zipcode}
    >{`${week[NewdateWeek]} ${NewdateDay}`}</div>
  );
};

export default Sign;
