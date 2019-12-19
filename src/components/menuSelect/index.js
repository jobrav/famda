import React, { useState, useContext } from "react";
import styled from "styled-components"
import { ReactComponent as Arrow } from "./arrow.svg";
import { SelectContext, DateContext } from "../../contexts"

const Wrapper = styled.div`
position: relative;
border-radius: 25px;
max-width: 120px;
width: calc(50vw - 7.5px);
padding: 0 2px;
height: 25px;
background: #efefefb9;
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

const Text = styled.a`
justify-self: center;
align-self: center;
align-self: center;
width: 100%;
height: 25px;
line-height: 25px;
font-size: 12.5px;
text-align: center;
font-weight: 600;
color: #b7b7b7;
transition: all 0.1s ease-in-out;

&:hover {
    color: #b7b7b79a;
    transition: all  0.1s ease-in-out;
}
`
const Icon = styled.div`
width: 12.5px;
fill: #b7b7b7;
transform: rotate(90deg);
justify-self: start;
align-self: center;
`

const MenuSelect = ({ allSelect }) => {
    const { select, setSelect } = useContext(SelectContext);
    const { show, setShow } = useContext(DateContext)
    let keys = Object.keys(allSelect)
    const [active, setActive] = useState(keys[0] || null);
    // const [show, setShow] = useState(true);



    return (
        <Wrapper>
            <Button onClick={() => setShow({ groupSource: !show.groupSource })}><Text >{keys ? select.name : "undefined"}</Text><Icon><Arrow /></Icon></Button>
        </Wrapper>
    )
}
export default MenuSelect;