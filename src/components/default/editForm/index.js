import React, { useState } from "react";
import styled from "styled-components"

const Section = styled.section`
height: 100%;
display: grid;
grid-template-columns: 100%;
grid-template-rows: 100px;
grid-auto-flow: row;
grid-auto-rows: max-content;
padding: 0 15px;
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

const Name = styled.input`
font-size: 40px;
font-weight: 500;
width: 100%;
    max-width: 620px;
color: ${props => props.theme.floatFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.floatFC || "#272727"};
align-self: center;
justify-self: center;
padding: 10px 0;
border-radius: 10px;
transition: all 100ms ease-in-out;
&:hover,:focus{
    transition: all 100ms ease-in-out;
    background: ${props => props.theme.secondaryBGC}1c
}
`
const Container = styled.div`
    display:grid;
    justify-self:center;
    align-self:start;
    width: calc(100% - 20px);
    padding: 0 10px;
    max-width: 600px;
    grid-template-columns: 25% 75%;
    grid-auto-rows: auto;
    margin-bottom: 5px;
    border-radius: 5px;
    overflow:hidden;
    background: ${props => props.theme.secondaryBGC};
`
const InputTitle = styled(Text)`
width:100%;
padding: 7.5px 0;
font-size: ${props => props.theme.defaultFontSize};
justify-self: start;
text-align: ${props => props.align === 'right' ? "right" : "left"};
align-self: center;
border-bottom: 1px solid ${props => props.theme.primaryBGC || "#fff"};
&:last-child,:nth-last-child(2){
    border-bottom: none;
}
`
const Input = styled.input`
width:100%;
padding: 7.5px 0;
font-size: ${props => props.theme.defaultFontSize};
font-weight: 300;
color: ${props => props.theme.floatFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.floatFC || "#272727"};
align-self: center;
text-align: ${props => props.align === 'left' ? "left" : "right"};
border-bottom: 1px solid ${props => props.theme.primaryBGC || "#fff"};
&:last-child,:nth-last-child(2){
    border-bottom: none;
}
`


const EditForm = () => {

    return (
        <Section>
            <Name placeholder="Nieuwe activiteit" />
            <Container>
                <InputTitle bold>Locatie</InputTitle>
                <Input placeholder="Thuis" />
                <InputTitle bold>Kalender</InputTitle>
                <Input placeholder="Privé" />
            </Container>
            <Container>
                <InputTitle bold>Start</InputTitle>
                <InputTitle align={"right"}>11-01-2020 10:20</InputTitle>
                <InputTitle bold>Eind</InputTitle>
                <InputTitle align={"right"}>10:45</InputTitle>
                <InputTitle bold>Eind</InputTitle>
                <InputTitle align={"right"}>10:45</InputTitle>
            </Container>
        </Section>
    );
};
export default EditForm;
