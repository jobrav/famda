import React from 'react';
import styled, { keyframes } from "styled-components"
import { Link, useLocation } from "react-router-dom";


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
    background: #1c1c1c9a;
    animation: ${fadeIn} 250ms ease-in-out;
    `
const Container = styled.div`
    position: fixed;
    top:25px;
    height: calc(100vh - 25px);
    display: grid;
    grid-template-rows: 45px 1fr;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    max-width: 850px;
    width: 100vw;
    background: ${props => props.theme.primaryBGC || "#fff"};
    overflow: hidden;
    animation: ${slideIn} 250ms cubic-bezier(0.22, 0.61, 0.36, 1);
`
const Header = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 100px 1fr 100px;
    padding: 0 15px;
    background: ${props => props.headBG || props.theme.secondaryBGC};
    border-bottom: ${props => props.theme.lineBGC || "#fff"} 1px inset;
`
const Text = styled.div`
cursor: ${props => props.cursor || "default"};
align-self: ${props => props.align || "none"};
justify-self: ${props => props.justify || "none"};
font-weight: ${props => props.bold ? "500" : "300"};
color: ${props => props.theme.floatFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.floatFC || "#272727"};
font-size: ${props => props.theme.defaultFontSize};
`
const Title = styled(Text)`
    justify-self:center;
    align-self:center;
    `
const Handle = styled.div`
    justify-self:center;
    align-self:start;
    margin-top: 5px;
    width: 30px;
    height: 3px;
    border-radius: 3px;
    background: ${props => props.theme.secondaryBGC || "#f3f3f3"};
    `
const Cancel = styled(Link)`
    cursor: ${props => props.cursor || "default"};
    align-self: ${props => props.align || "none"};
    justify-self: ${props => props.justify || "none"};
    font-weight: ${props => props.bold ? "500" : "300"};
    color: ${props => props.theme.floatFC || "#272727"};
    -webkit-text-fill-color: ${props => props.theme.floatFC || "#272727"};
    font-size: ${props => props.theme.defaultFontSize};
    justify-self:start;
    align-self:center;
    color: #007aff;
    -webkit-text-fill-color: #007aff;
`
const Submit = styled(Cancel)`
    justify-self:end;
    align-self:center;
    font-weight: 500;
`
const Body = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    justify-content: center;
`



const FloatWindowDefault = ({ route, title, children, headBG, cancel, compleet }) => {
    const { state } = useLocation();
    const closeCard = () => {
        route.history.goBack();
    };
    return <Section>
        <Container>
            <Header headBG={headBG}>
                <Cancel to={{ hash: "" }} onClick={closeCard} cursor="pointer">{cancel ? cancel.title : "Annuleer"}</Cancel>
                {title ? <Title bold>{state ? state.title : title}</Title> : <Handle />}
                <Submit to={compleet ? compleet.link || "./" : "./"} cursor="pointer">{compleet ? compleet.title : "Opslaan"}</Submit>
            </Header>
            <Body>{children}</Body>
        </Container>
    </Section>
}
export default FloatWindowDefault;