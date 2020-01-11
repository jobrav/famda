import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Link)`
  width: 100%;
  border-bottom: #efefef 0.1vh solid;
  background: ${props => props.bg || "rgba(78, 78, 78, 0.082)"};

  display: grid;
  grid-column: 1;
  grid-row: ${props => props.start}/${props => props.end};
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`
const Title = styled.div`
  align-self: start;
  justify-self: start;
  margin: 5px;
  color: #fff;
  font-size: ${props => props.theme.titleFontSize || "17px"};
  font-weight: bold;
`

const Appointment = ({ data }) => {

  const { id, parentTheme, title, feed, zipcodeEnd, zipcode } = data;
  const getStartHour = new Date(zipcode).getHours()
  const getStartQuarter = new Date(zipcode).getMinutes()
  const startQuarter = Math.floor(getStartQuarter / 15)
  const getEndHour = new Date(zipcodeEnd).getHours()
  const getEndQuarter = new Date(zipcodeEnd).getMinutes()
  const endQuarter = Math.floor(getEndQuarter / 15)

  return (
    <Container
      to={`card/`}
      bg={parentTheme}
      start={getStartHour * 4 + startQuarter}
      end={getEndHour * 4 + endQuarter}
      data-key={id}
      data-zipcode={zipcode}
      key={`${zipcode}_appointment_day_view`}
    >
      <Title>
        {`${title}`}
      </Title>
    </Container>
  );
};

export default Appointment;
