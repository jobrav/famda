import React from 'react';
import styled, { keyframes } from "styled-components"

//animation keyframes
const fadeIn = keyframes`
from {
    background: #12121200;
  }

  to {
    background: #1212129a;
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
    background: #1212129a;
    animation: ${fadeIn} 250ms ease-in-out;
    `
const Container = styled.div`
    display: grid;
    grid-template-rows: 45px 1fr;
    border-radius: 5px;
    max-width: 750px;
    height: calc(100vh - 50px);
    width: 90vw;
    background: ${props => props.theme.primaryBGC || "#fff"};
    overflow: hidden;
    animation: ${slideIn} 250ms cubic-bezier(0.22, 0.61, 0.36, 1);
`
const Header = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 100px 1fr 100px;
    padding: 0 15px;
    background: ${props => props.theme.primaryBGC || "#fff"};
`
const Text = styled.div`
cursor: ${props => props.cursor || "default"};
align-self: ${props => props.align || "none"};
justify-self: ${props => props.justify || "none"};
font-weight: ${props => props.bold ? "600" : "300"};
color: ${props => props.theme.primaryFC || "#272727"};
font-size: 12.5px;
`
const Title = styled(Text)`
    justify-self:center;
    align-self:center;
    `
const Cancel = styled(Text)`
    justify-self:start;
    align-self:center;
    color: #007aff;
`
const Submit = styled(Text)`
    justify-self:end;
    align-self:center;
    font-weight: 800;
    color: #007aff;
`
const Body = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`



const FloatWindowDefault = ({ route, title, children }) => {
    const closeCard = () => {
        route.history.goBack();
    };
    return <Section>
        <Container>
            <Header>
                <Cancel onClick={closeCard} cursor="pointer">Annuleer</Cancel>
                <Title>{title || "undefined"}</Title>
                <Submit onClick={closeCard} cursor="pointer">Opslaan</Submit>
            </Header>
            <Body>{children}</Body>
        </Container>
    </Section>
}
export default FloatWindowDefault;