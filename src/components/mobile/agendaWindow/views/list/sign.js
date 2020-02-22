import React from "react";
import styled from "styled-components"

const month = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december"
];
const Container = styled.div`
width: calc(100% - 45px);
margin: 3px 2.5px;
position: sticky;
padding: 0 20px;
top: 0px;
z-index: 5;
overflow: hidden;
border-radius: 5px;
background: ${({ theme: { gray4 } }) => gray4};
`
const Item = styled.h4`
margin:0;
display: inline-block;
padding: 5px 0;

text-align: left;
font-size: 14px;
// line-height: 15px;
color: ${({ today, theme: { hueReverse, darkMode, blue, orange } }) => today ? darkMode ? orange : blue : hueReverse};
-webkit-text-fill-color: ${({ today, theme: { hueReverse, darkMode, blue, orange } }) => today ? darkMode ? orange : blue : hueReverse};
`


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

  return (
    <Container
      data-sign={"type" in props && props.type}
      key={`${props.zipcode}_sign`}
      sign-date={props.zipcode}
      className={`sign_zipcode_${new Date(props.zipcode).setHours(0, 0, 0, 0)}`}
    >
      <Item today={tmm === NewdateMonth && tdd === NewdateDay}>
        {`${NewdateDay} ${month[NewdateMonth]}`}</Item>
    </Container>
  );
};

export default Sign;
