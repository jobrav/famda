import React from "react";

const month = [
  "Januari",
  "Febuari",
  "Maart",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "December"
];
const Sign = props => {
  const date = new Date();
  const tmm = date.getMonth();
  const tdd = date.getDate();
  let classType = "sign_list";
  let extraSign = [];
  const Newdate = new Date(props.zipcode);
  const NewdateMonth = Newdate.getMonth();
  const NewdateDay = Newdate.getDate();
  const NewdateYear = Newdate.getFullYear();

  if (tmm === NewdateMonth && tdd === NewdateDay) classType = "sign_list today";

  // prevDate = props.input || {
  //   mm: NewdateMonth,
  //   dd: NewdateDay,
  //   yy: NewdateYear
  // };
  return (
    <div
      data-sign={"type" in props && props.type}
      className="container_list"
      key={`${props.zipcode}_sign`}
      data-date={props.zipcode}
    >
      <div
        key={`${classType} ${props.zipcode}`}
        className={classType}
      >{`${NewdateDay} ${month[NewdateMonth]} ${NewdateYear}`}</div>
    </div>
  );
};

export default Sign;
