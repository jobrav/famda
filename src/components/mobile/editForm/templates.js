import React from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom";

const Section = styled.div`
    justify-self:stretch;
    align-self:stretch;
    display:grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr max-content;
    `
const List = styled.div`
    justify-self:stretch;
    align-self:stretch;
    display:grid;
    grid-template-rows: 1fr;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    overflow: auto hidden;
    `
const Container = styled.button`
font-size: 16.5px;

    margin: 0;
    margin-right: 5px;
    padding: 2.5px 15px;
    justify-self: start;
    align-self:stretch;
    color: ${({ active, theme: { darkMode, gray1, hueReverse } }) => active ? '#ffffff' : (darkMode ? gray1 : hueReverse)};
    -webkit-text-fill-color: ${({ active, theme: { darkMode, gray1, hueReverse } }) => active ? '#ffffff' : (darkMode ? gray1 : hueReverse)};
    outline:none;
    border:none;
    background: ${({ active, theme: { darkMode, orange, gray5, hue, blue } }) => active ? darkMode ? orange : blue : darkMode ? gray5 : hue};
    border-radius: 50px;
`

const SeeAll = styled(Link)`
font-size: 16.5px;
color: ${({ theme: { blue } }) => blue};
-webkit-text-fill-color:${({ theme: { blue } }) => blue};
text-align-center;
padding-left: 10px;
padding-right:15px;
justify-self:start;
align-self:center;
font-weight: 400;
`

const templates = [{ name: 'Visvalk', id: '23432', structure: [] }, { name: 'Papier weggooien', id: '123', structure: [] }]

const Templates = React.memo(({ active, setActive }) => {

    return <Section>
        <List>
            <Container active={active.id === 'default'} onClick={() => setActive({ id: 'default' })}>Standaard</Container>
            {templates.map(tmp => <Container active={active.id === tmp.id} key={tmp.id} onClick={() => setActive(tmp)}>{tmp.name}</Container>)}
        </List>
        <SeeAll to='templates'>Wijzig</SeeAll>
    </Section>
})
export default Templates;