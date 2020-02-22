import React from 'react';
import styled from "styled-components"

const Container = styled.div`
    cursor: pointer;
    position: relative;
    width: 40px;
    height: 22.5px;
    border-radius: 22.5px;
    justify-self:end;
    align-self:center;
    background: ${props => props.active ? "#409fff" : props.theme.primaryBGC || "#fff"};
    border: solid 2px ${props => props.active ? "#409fff" : props.theme.primaryBGC || "#fff"};
    display: flex;
    justify-content:${props => props.active ? "flex-end" : "flex-start"};
    `
const Handle = styled.div`
    width: 22.5px;
    height: 22.5px;
    background: ${props => props.theme.secondaryBGC || "#f3f3f3"};
    border-radius: 18.5px;
`

const SwitchButton = ({ active, clicked }) => {

    return <Container onClick={clicked} active={active}>
        <Handle />
    </Container>
}
export default SwitchButton;