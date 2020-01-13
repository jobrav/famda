// styling
import React from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";

const arrow = (
  <svg viewBox="0 0 491.86 491.86" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z" />
    </g>
  </svg>
)

const Container = styled(Link)`
  grid-template-columns: auto 35px;
  grid-template-rows: 1fr;
  grid-gap: 0 2.5px;
  display: grid;
  background: ${props => props.theme.secondaryBGC || "#f3f3f3"}
  width: 90%;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover{
    transform: translateX(2px);
    transition: transform 150ms ease-in-out;
  }
  &:focus{
    transform: translateX(2px);
    transition: transform 150ms ease-in-out;
  }
}
`
const Title = styled.div`
  margin-left: 7.5px;
  justify-self: start;
  align-self: center;
  font-weight: 400;
  font-size: ${props => props.theme.defaultFontSize};
  color: #b7b7b7;
  -webkit-text-fill-color: #b7b7b7;
`
const Arrow = styled.div`
  justify-self: center;
  align-self: center;
  width: 12.5px;
  & > svg{
    fill: ${props => props.theme.primaryFC || "#272727"};
    display: inherit;
  }
`


const FinishProfile = () => {
  return (
    <Container to="/profile/edit">
      <Title>
        Maak je profiel compleet
      </Title>
      <Arrow>
        {arrow}
      </Arrow>
    </Container>
  );
};

export default FinishProfile;
