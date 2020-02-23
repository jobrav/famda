import React, { useState } from "react";
import styled from "styled-components"
import { useLocation, Link } from "react-router-dom";
import TimeCard from "./timecard";

const Section = styled.section`
height: 100%;
display: grid;
grid-template-columns: 100%;
grid-template-rows: max-content;
grid-auto-flow: row;
grid-auto-rows: max-content;
padding: 0 15px;
width: calc(100% - 30px);
max-width: 620px;
`
const Text = styled.div`
pointer-events: none;
cursor: ${props => props.cursor || "default"};
align-self: ${props => props.align || "none"};
justify-self: ${props => props.justify || "none"};
font-weight: ${props => props.bold ? "500" : "300"};
color: ${props => props.theme.floatFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.floatFC || "#272727"};
`

const Name = styled(Text)`
font-size: 30px;
font-weight: 700;
width: 100%;
    max-width: 620px;
color: ${props => props.theme.floatFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.floatFC || "#272727"};
align-self: center;
justify-self: center;
padding: 11px 0;
border-radius: 10px;
transition: all 100ms ease-in-out;
&:hover,:focus{
    transition: all 100ms ease-in-out;
    background: ${props => props.theme.secondaryBGC}1c
}
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-self:center;
    align-self:start;
    width: calc(100% - 20px);
    padding-left: 15px;
    max-width: 600px;
    margin-bottom: 15px;
    border-radius: 10px;
    overflow:hidden;
    background: ${props => props.theme.secondaryBGC};
`
const Li = styled.div`
display:grid;
grid-template-columns: 1fr 1fr;
grid-auto-rows: auto;
padding-right: 15px;
border-bottom: 1px solid ${props => props.theme.primaryFC || "#fff"}40;
&:last-child{
    border-bottom: none;
}
`
const InputTitle = styled(Text)`
width:100%;
padding: 11px 0;
font-weight: 400;
font-size: ${props => props.theme.defaultFontSize};
justify-self: start;
text-align: ${props => props.align === 'right' ? "right" : "left"};
align-self: center;
color: ${props => props.theme.floatFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.floatFC || "#272727"};
`
const Input = styled.div`
justify-self:stretch;
padding: 11px 0;
font-size: ${props => props.theme.defaultFontSize};
font-weight: 400;
color: ${props => props.theme.primaryFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.primaryFC || "#272727"};
align-self: center;
text-align: ${props => props.align === 'left' ? "left" : "right"};
`


const CardForm = () => {
    const { state } = useLocation();
    const { title, feed, zipcode, zipcodeEnd, repeatType, date } = state || {};

    return (
        <Section>
            <Name>{title || "undefind"}</Name>
            <TimeCard zipcode={zipcode || null} zipcodeEnd={zipcodeEnd || null} repeatType={repeatType || null} date={date || null} />
            <Container>
                <Li>
                    <InputTitle>{"feed"}</InputTitle>
                    <Input >{feed || "undefind"}</Input>
                </Li>
            </Container>
        </Section>
    );
};
export default CardForm;
