import React from "react";
import styled from "styled-components"

const week = [
  "Zo.",
  "Ma.",
  "Di.",
  "Wo.",
  "Do.",
  "Vr.",
  "Za."
];

const Container = styled.div`
  cursor: default;
  pointer-events: none;
  align-self: end;
  justify-self: start;
  color: #272727;
  font-size: ${props => props.theme.titleFontSize};
  font-weight: bold;
  margin-bottom: 5px;
  padding: 0 2.5px;
  color: ${props => props.today ? "#007aff" : props.theme.primaryFC};
`


const Sign = ({ zipcode }) => {
  const date = new Date();
  const tmm = date.getMonth();
  const tdd = date.getDate();
  const Newdate = new Date(zipcode);
  const NewdateMonth = Newdate.getMonth();
  const NewdateWeek = Newdate.getDay();
  const NewdateDay = Newdate.getDate();
  const NewdateYear = Newdate.getFullYear();

  let isToday = tmm === NewdateMonth && tdd === NewdateDay;
  return (
    <Container
      key={`${isToday ? "today" : "sign"} ${zipcode}`}
      today={isToday}
      className={`sign_zipcode_${zipcode}`}
    >{`${week[NewdateWeek]} ${NewdateDay}`}</Container>
  );
};

export default Sign;
