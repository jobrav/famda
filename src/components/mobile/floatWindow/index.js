import React from 'react';
import styled, { keyframes } from "styled-components"

//animation keyframes
const fadeIn = keyframes`
from {
    background: #1c1c1c00;
  }

  to {
    background: #1c1c1c9a;
  }
`
const slideIn = keyframes`
from {
    transform: translateY(100vh);
  }

  to {
    transform: translateY(0vh);
  }
`

// styles
const Section = styled.section`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    display: flex;
    justify-content:center;
    align-items: flex-end;
    z-index: 15;
    // background: #1c1c1c9a;
    // animation: ${fadeIn} 250ms ease-in-out;
    `
const Container = styled.div`
    box-shadow: 0px -5px 20px 0px #12121266;
    position: fixed;
    top:25px;
    height: calc(100vh - 25px);
    display: grid;
    grid-template-rows: 60px 1fr;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    max-width: 750px;
    width: 100vw;
    background: ${props => props.theme.primaryBGC || "#fff"};
    overflow: hidden;
    animation: ${slideIn}  300ms  cubic-bezier(0.24, 0.53, 0.09, 1.01);
`

const Header = styled.div`
justify-self:stretch;
align-self:stretch;
`
const Body = styled.div`
justify-self:stretch;
align-self:stretch;
    overflow: auto;
`



const FloatWindowDefault = ({ route: { history, match: { params } }, children }) => {
  return <Section>
    <Container className={["pannel", "returnPannel", "nonePannel"][Object.values(params).length - 1]}>
      <Header>{children[0]}</Header>
      <Body>{children[1]}</Body>
    </Container>
  </Section>
}
export default FloatWindowDefault;