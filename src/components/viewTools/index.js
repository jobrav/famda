import React, { useContext } from "react";
import styled from "styled-components"
import { DateContext } from "../../contexts"
import { ReactComponent as Arrow } from "./arrow.svg";
import { ReactComponent as Calendar } from "./calendar.svg";

const Button = styled.a`
position: relative;
border-radius: 25px;
max-width: 120px;
width: calc(50vw - 7.5px);
padding: 0 2px;
height: 25px;
background: #efefefb9;
backdrop-filter: blur(2px);
display: grid;
justify-self: start;
align-self: center;
grid-template-columns: auto 20px;
grid-template-rows: 1fr;
`
const Text = styled.div`
justify-self: center;
align-self: center;
align-self: center;
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
justify-self: start;
align-self: center;
`

const ViewTools = () => {
    let pos = 0;
    const { show, setShow } = useContext(DateContext)
    const move = direction => {
        let timeline = document.getElementsByClassName("timeline")[0];
        let child = document.getElementsByClassName("sign_day");
        direction === "right" ? pos < child.length - 1 && pos++ : pos > 0 && pos--;
        console.log(pos)
        child[pos] && (timeline.scrollLeft = child[pos].offsetLeft)
    }

    const date = new Date();
    const dd = date.getDate()
    const mm = date.getMonth()
    const monthNames = [
        "jan.", "feb.", "mrt.", "apr.", "mei", "jun", "jul", "aug.", "sep.", "okt.", "nov.", "dec."
    ]


    return (
        <Button onClick={() => setShow({ datePicker: !show.datePicker })}>
            <Text className="text">{`${dd} ${monthNames[mm]}`}</Text>
            <Icon><Calendar className="icon" /></Icon>
        </Button>

    );
}

export default ViewTools;
