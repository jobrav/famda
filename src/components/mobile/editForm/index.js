import React from "react";
import styled from "styled-components"
import { Link } from "react-router-dom";

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
    padding-left: 10px;
    max-width: 600px;
    margin-bottom: 15px;
    border-radius: 10px;
    overflow:hidden;
    background: ${props => props.theme.secondaryBGC};
`
const Li = styled(Link)`
display:grid;
grid-template-columns: 1fr 1fr;
grid-auto-rows: auto;
padding-right: 15px;
padding-left: 5px;
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
const Input = styled.input`
width:100%;
padding: 11px 0;
font-size: ${props => props.theme.defaultFontSize};
font-weight: 400;
color: ${props => props.theme.primaryFC || "#272727"};
-webkit-text-fill-color: ${props => props.theme.primaryFC || "#272727"};
align-self: center;
text-align: ${props => props.align === 'left' ? "left" : "right"};
`


const EditForm = () => {

    return (
        <Section>
            <Name placeholder="Nieuwe activiteit" />
            <Container>
                <Li to="test">
                    <InputTitle>Locatie</InputTitle>
                    <Input placeholder="Thuis" />
                </Li>
                <Li to="test">
                    <InputTitle>Kalender</InputTitle>
                    <Input placeholder="Privé" />
                </Li>
            </Container>
            <Container>
                <Li to="test">
                    <InputTitle>Start</InputTitle>
                    <Input placeholder="11-01-2020 10:20" />
                </Li><Li to="test">
                    <InputTitle>Eind</InputTitle>
                    <Input placeholder="10:45" />
                </Li><Li to="test">
                    <InputTitle>Herhaal</InputTitle>
                    <Input placeholder="Niet" />
                </Li>
            </Container>
        </Section>
    );
};
export default EditForm;
