import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components"
import { ReactComponent as Arrow } from "./arrow.svg";
import { SelectContext, ShowContext } from "../../../contexts"

const Wrapper = styled.div`
position: relative;
border-radius: 25px;
max-width: 120px;
width: calc(50vw - 7.5px);
padding: 0 2px;
height: 25px;
background: ${props => props.theme.secondaryBGC || "#f3f3f3"};
backdrop-filter: blur(2px);
display: grid;
justify-self: end;
align-self: center;
`
const Button = styled.a`
border-radius: 25px;
width: 100%;
height: 100%;
display: grid;
justify-self: center;
align-self: center;
grid-template-columns: auto 20px;
grid-template-rows: 1fr;
`

const Text = styled.div`
justify-self: center;
align-self: center;
align-self: center;
width: 100%;
height: 25px;
line-height: 25px;
font-size: ${props => props.theme.defaultFontSize};
text-align: center;
font-weight: 600;
color: ${props => props.theme.primaryFC};
-webkit-text-fill-color: ${props => props.theme.primaryFC};
transition: all 0.1s ease-in-out;

&:hover {
    color: ${props => props.theme.primaryFHC};
    -webkit-text-fill-color: ${props => props.theme.primaryFHC};
    transition: all  0.1s ease-in-out;
}
`
const Icon = styled.div`
width: 12.5px;
fill: ${props => props.theme.primaryFC || "#fff"}
transform: rotate(90deg);
justify-self: start;
align-self: center;
`

const MenuSelect = ({ allSelect }) => {
    const { select, setSelect } = useContext(SelectContext);
    const { show, setShow } = useContext(ShowContext)
    let keys = Object.keys(allSelect)


    return (
        <Wrapper >
            <Button onClick={() => setShow({ groupSource: !show.groupSource })}>
                <Text >{keys ? select.name : "undefined"}</Text>
                <Icon>
                    <Arrow />
                </Icon>
            </Button>
        </Wrapper>
    )
}
export default MenuSelect;