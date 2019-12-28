import React, { useContext } from "react";
import styled from "styled-components"
import { ShowContext } from "../../contexts"
import { ReactComponent as Arrow } from "./arrow.svg";
import { ReactComponent as Calendar } from "./calendar.svg";

const Button = styled.a`
position: relative;
border-radius: 25px;
max-width: 120px;
width: calc(50vw - 7.5px);
padding: 0 2px;
height: 25px;
background: ${props => props.theme.secondaryBGC || "#f3f3f3"};
backdrop-filter: blur(2px);
display: grid;
justify-self: start;
align-self: center;
grid-template-columns: auto 20px;
grid-template-rows: 1fr;
z-index: 10;
`
const Text = styled.div`
justify-self: center;
align-self: center;
align-self: center;
font-size: 12.5px;
text-align: center;
font-weight: 600;
color: ${props => props.theme.primaryFC};
transition: all 0.1s ease-in-out;

&:hover {
    color: #b7b7b79a;
    transition: all  0.1s ease-in-out;
}
`
const Icon = styled.div`
width: 12.5px;
fill: ${props => props.theme.primaryFC};
justify-self: start;
align-self: center;
`

const ViewTools = () => {
    const { show, setShow } = useContext(ShowContext)
    const date = new Date();
    const dd = date.getDate()
    const mm = date.getMonth()
    const monthNames = [
        "jan.", "feb.", "mrt.", "apr.", "mei", "jun", "jul", "aug.", "sep.", "okt.", "nov.", "dec."
    ]


    return (
        <Button onClick={() => setShow({ datePicker: !show.datePicker })}>
            <Text>{`${dd} ${monthNames[mm]}`}</Text>
            <Icon><Calendar /></Icon>
        </Button>

    );
}

export default ViewTools;
