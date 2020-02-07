import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
// import { activate } from "./../infoCard";

const Container = styled(Link)`
width: 100%;
background: ${props => props.theme.secondaryBGC || "f3f3f3"};
padding: 2.5px;
display: block;
`
const Title = styled.div`
color: ${props => props.theme.primaryFC || "#fff"};
font-size: ${props => props.theme.defaultFontSize || "16.5px"};
font-weight: 600;
`

const Event = props => {
  const activity = props.data;
  return (
    <Container
      to={{
        pathname: "/view/card",
        state: activity
      }}
      key={`${activity.id}_${props.zipcode}_obj`}
      data-key={activity.id}
      data-zipcode={props.zipcode}
    >
      <Title >{props.data.title}</Title>
    </Container>
  );
};

export default Event;
