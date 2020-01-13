import React, { useContext } from 'react';
import { DocRefContext } from "../../../contexts";
import styled from 'styled-components';

const Section = styled.section`
    grid-row: 1;
    grid-column: 2;
    display: flex;
    flex-direction: row;
    padding: 0 15px;
    align-items: center;
    justify-content: start;
`
const Item = styled.a`
    padding: 0 10px;
    line-height: 25px;
    height: 25px;
    background: ${props => props.theme.secondaryBGC || "#f3f3f3"};
    border-radius: 21px;
    color: ${props => props.theme.primaryFC || "#121212"};
    -webkit-text-fill-color: ${props => props.theme.primaryFC || "#121212"};
    font-weight: 500;
    font-size: ${props => props.theme.defaultFontSize};
    margin-right: 5px;

    &:hover{
        color: ${props => props.theme.primaryFHC || "#121212"};
        -webkit-text-fill-color: ${props => props.theme.primaryFHC || "#121212"};
    }

    &:last-child{
        color: white;
        -webkit-text-fill-color: white;
        background: #b7b7b7;
    }
`



const DocFinder = React.memo(({ user }) => {
    const { docRef, setDocRef } = useContext(DocRefContext)
    const move = i => setDocRef(prev => [...prev.splice(0, i + 1)]);
    return <Section>{docRef.map((item, i) =>
        <Item onClick={() => move(i)}>{` ${i === 0 ? user ? user.firstName : "Gebruiker" : item}`}</Item>)}
    </Section>
})
export default DocFinder;