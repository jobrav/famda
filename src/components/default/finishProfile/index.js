// styling
import React from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";

const arrow = (
  <svg viewBox="0 0 530 525" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="m512 256c0-141.488281-114.496094-256-256-256-141.488281 0-256 114.496094-256 256 0 140.234375 113.539062 256 256 256 141.875 0 256-115.121094 256-256zm-256-226c124.617188 0 226 101.382812 226 226 0 45.585938-13.558594 89.402344-38.703125 126.515625-100.96875-108.609375-273.441406-108.804687-374.59375 0-25.144531-37.113281-38.703125-80.929687-38.703125-126.515625 0-124.617188 101.382812-226 226-226zm-168.585938 376.5c89.773438-100.695312 247.421876-100.671875 337.167969 0-90.074219 100.773438-247.054687 100.804688-337.167969 0zm0 0" /><path d="m256 271c49.625 0 90-40.375 90-90v-30c0-49.625-40.375-90-90-90s-90 40.375-90 90v30c0 49.625 40.375 90 90 90zm-60-120c0-33.085938 26.914062-60 60-60s60 26.914062 60 60v30c0 33.085938-26.914062 60-60 60s-60-26.914062-60-60zm0 0" />
    </g>
  </svg>
)

const Container = styled(Link)`
  grid-template-columns: max-content auto;
  grid-template-rows: 1fr;
  grid-gap: 0 5px;
  display: grid;
  background: ${props => props.theme.menuIC}
  width: 90%;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  &:hover{
    transform: scale(0.99);
    transition: transform 150ms ease-in-out;
  }
  &:focus{
    transform: scale(0.99);
    transition: transform 150ms ease-in-out;
  }
}
`
const Title = styled.div`
  justify-self: start;
  align-self: center;
  font-weight: 400;
  font-size: ${props => props.theme.defaultFontSize};
  color: #fff;
  -webkit-text-fill-color: #fff;
`
const Arrow = styled.div`
  margin-left: 10px;
  justify-self: center;
  align-self: center;
  width: 15px;
  & > svg{
    fill: #fff;
    display: inherit;
  }
`


const FinishProfile = () => {
  return (
    <Container to="/profile/edit">
      <Arrow>
        {arrow}
      </Arrow>
      <Title>
        Maak je profiel compleet
      </Title>
    </Container>
  );
};

export default FinishProfile;
