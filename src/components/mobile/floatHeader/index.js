import React from 'react';
import styled from "styled-components"
import { Link } from "react-router-dom";

const Header = styled.div`
display: grid;
grid-template-rows: 1fr;
grid-template-columns: 100px 1fr 100px;
padding: 0 15px;
height: 100%;
// width: 100%;
background: ${props => props.colortag ? props.theme[props.colortag] : props.theme.secondaryBGC};
border-bottom: inset ${props => props.theme.lineBGC || "#ffffff"}da ${props => props.border === false ? "0px" : "1px"} solid;
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
const FloatHeader = ({ header, left, right, title }) => {
    const { colortag, border } = header || {};
    return <Header border={border} colortag={colortag}>
        <Cancel to={(left && left.link) || "../"} cursor="pointer">{left ? left.title : "Annuleer"}</Cancel>
        {title ? <Title bold>{title}</Title> : !title.handle || <Handle />}
        <Submit to={(right && right.link) || "../"} cursor="pointer">{right ? right.title : "Opslaan"}</Submit>
    </Header>
}
export default FloatHeader;