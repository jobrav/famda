import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
// import { activate } from "./../infoCard";

const Container = styled(Link)`
width: calc(100% - 40px);
padding: 2.5px 20px;
border-bottom: ${({ theme: { gray6 } }) => gray6}66 1px solid;
background: ${({ theme: { darkMode, gray6, hue } }) => darkMode ? gray6 : hue};
display: grid;
grid-template-columns: 10% 10% 80%;
grid-template-rows: 25px 25px;
grid-template-areas:
  "appTime appType appTitle"
  "appTime appType appFeed";
`
const Theme = styled.div`
justify-self: center;
align-self: stretch;
grid-area: appType;
width: 2px;
background: ${({ bg }) => bg || "#efefef"};
`
const TimeContainer = styled.div`
padding: 7.5px 0;
justify-self: stretch;
align-self: stretch;
grid-area: appTime;
display:grid;
gird-template-rows: repeat(2,1fr);
`
const Time = styled.h4`
margin:0;
padding:0;
font-size: 14px;
font-weight:700;
line-height: 15px
justify-self:center;
align-self:start;
color: ${({ theme: { darkMode, gray1, hueReverse } }) => darkMode ? gray1 : hueReverse};
-webkit-text-fill-color: ${({ theme: { darkMode, gray1, hueReverse } }) => darkMode ? gray1 : hueReverse};
&:nth-child(even) {
  align-self:end;
}

`
const Title = styled.h3`
margin:0;
padding:0;
font-weight:700;
font-size:16px;
justify-self:start;
align-self:end;
grid-area: appTitle;
color: ${({ theme: { darkMode, gray1, hueReverse } }) => darkMode ? gray1 : hueReverse};
-webkit-text-fill-color: ${({ theme: { darkMode, gray1, hueReverse } }) => darkMode ? gray1 : hueReverse};
`
const Feed = styled.p`
margin:0;
padding:0;
font-size: 12px;
font-weight: 300;
grid-area: appFeed;
justify-self:start;
align-self:start;
color: ${({ theme: { darkMode, gray1, hueReverse } }) => darkMode ? gray1 : hueReverse};
-webkit-text-fill-color: ${({ theme: { darkMode, gray1, hueReverse } }) => darkMode ? gray1 : hueReverse};
`

const Appointment = ({ data, beforeToday }) => {
  const { id, time, theme, parentTheme, title, feed, zipcode, zipcodeEnd } = data;
  const start = new Date(zipcode);
  const end = new Date(zipcodeEnd);

  return (
    <Container
      to={{
        pathname: "/view/card",
        state: data
      }}
      key={`${id}_${zipcode}_obj`}
      data-key={id}
      data-zipcode={zipcode}
      style={{ opacity: beforeToday && 0.9 }}
    >
      <TimeContainer>
        <Time>
          {!time ? "hele" : `${start.getHours() < 10 ? "0" : ""}${start.getHours()}:${start.getMinutes() < 10 ? "0" : ""}${start.getMinutes()}`}
        </Time>
        <Time>
          {!time ? "dag" : `${end.getHours() < 10 ? "0" : ""}${end.getHours()}:${end.getMinutes() < 10 ? "0" : ""}${end.getMinutes()}`}
        </Time>
      </TimeContainer>

      <Theme bg={theme || parentTheme} />

      <Title>{title}</Title>
      <Feed>{feed}</Feed>
    </Container>
  );
};

export default Appointment;
