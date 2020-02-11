import React from 'react';
import { Link } from "react-router-dom";
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
    animation: ${slideIn} 250ms cubic-bezier(0.22, 0.61, 0.36, 1);
`
const Header = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 100px 1fr 100px;
    padding: 0 15px;
    background: ${props => props.colortag ? props.theme[props.colortag] : props.theme.secondaryBGC};
    border-bottom: inset ${props => props.theme.lineBGC || "#fff"} ${props => props.border === false ? "0px" : "1px"};
`
const Text = styled.div`
cursor: ${props => props.cursor || "default"};
align-self: ${props => props.align || "none"};
justify-self: ${props => props.justify || "none"};
font-weight: ${props => props.bold ? "600" : "300"};
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
font-weight: ${props => props.bold ? "600" : "300"};
color: ${props => props.theme.floatFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.floatFC || "#272727"};
font-size: ${props => props.theme.defaultFontSize};
    justify-self:start;
    align-self:center;
    color: #007aff;
    -webkit-text-fill-color: #007aff;
`
const Submit = styled(Link)`
cursor: ${props => props.cursor || "default"};
align-self: ${props => props.align || "none"};
justify-self: ${props => props.justify || "none"};
font-weight: ${props => props.bold ? "600" : "300"};
color: ${props => props.theme.floatFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.floatFC || "#272727"};
font-size: ${props => props.theme.defaultFontSize};
    justify-self:end;
    align-self:center;
    font-weight: 700;
    color: #007aff;
    -webkit-text-fill-color: #007aff;
`
const Body = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`



const FloatWindowDefault = ({ header, route: { history, match: { params } }, left, right, title, children }) => {
    const closeCard = () => {
        history.goBack();
    };
    const { colortag, border } = header || {};
    return <Section>
        <Container className={["pannel", "returnPannel", "nonePannel"][Object.values(params).length - 1]}>
            <Header border={border} colortag={colortag}>
                <Cancel to={(left && left.link) || "../"} cursor="pointer">{left ? left.title : "Annuleer"}</Cancel>
                {title ? <Title bold>{title}</Title> : !title.handle || <Handle />}
                <Submit to={(right && right.link) || "../"} cursor="pointer">{right ? right.title : "Opslaan"}</Submit>
            </Header>
            <Body>{children}</Body>
        </Container>
    </Section>
}
export default FloatWindowDefault;