import React, { useState } from "react";
import styled from "styled-components"
import SwitchButton from "../../buttons/switch"

const Section = styled.section`
height: 100%;
width: 100%;
max-width: 620px;
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
const SwitchInput = styled(SwitchButton)`
`

const EditForm = () => {
    //states
    const [fullDay, setFullDay] = useState(false);

    return (
        <Section>
            <Name placeholder="Nieuwe activiteit" />
            <Container>
                <Li>
                    <InputTitle>Locatie</InputTitle>
                    <Input placeholder="Thuis" />
                </Li>
                <Li>
                    <InputTitle>Kalender</InputTitle>
                    <Input placeholder="Privé" />
                </Li>
            </Container>
            <Container>
                <Li>
                    <InputTitle>Hele dag</InputTitle>
                    <SwitchInput clicked={() => setFullDay(e => !e)} active={fullDay} />
                </Li>
                <Li>
                    <InputTitle>Begin</InputTitle>
                    <Input placeholder="11-01-2020 10:20" />
                </Li><Li>
                    <InputTitle>Eind</InputTitle>
                    <Input placeholder="10:45" />
                </Li><Li>
                    <InputTitle>Herhaal</InputTitle>
                    <Input placeholder="Niet" />
                </Li>
                {!fullDay && <Li>
                    <InputTitle>Reistijd</InputTitle>
                    <Input placeholder="Niet" />
                </Li>}
            </Container>
        </Section>
    );
};
export default EditForm;
