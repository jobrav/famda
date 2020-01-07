import React, { useContext } from "react";
import styled from "styled-components"
import { ShowContext, DateContext } from "../../../contexts"
import { ReactComponent as Arrow } from "./arrow.svg";
import { ReactComponent as Calendar } from "./calendar.svg";

const Container = styled.div`
    width: 200px;
    display: grid;
    grid-template-rows:1fr;
    grid-auto-flow: column;
    grid-atuo-culumn: auto;
    height: 25px;
    justify-self: start;
    align-self: center;
`
const Button = styled.a`
position: relative;
border-radius: 25px;
margin: 0 2.5px;
height: 100%;
background: ${props => props.theme.secondaryBGC || "#f3f3f3"};
backdrop-filter: blur(2px);
display: grid;
justify-self: center;
align-self: center;
grid-template-columns: auto;
grid-template-rows: 1fr;
z-index: 10;
& > svg{
    fill: ${props => props.theme.primaryFC};
    width: 12px;
    height: 12px;
    padding: 6.5px;
    transform: rotate(${props => props.rotate ? 180 : 0}deg);
    &:hover {
        fill: #b7b7b79a;
        transition: all  0.1s ease-in-out;
    }
}
`
const Text = styled.div`
justify-self: center;
align-self: center;
align-self: center;
font-size: ${props => props.theme.defaultFontSize};
text-align: center;
font-weight: 600;
color: ${props => props.theme.primaryFC};
-webkit-text-fill-color: ${props => props.theme.primaryFC};
transition: all 0.1s ease-in-out;
padding: 0 15px;

&:hover {
    color: #b7b7b79a;
    -webkit-text-fill-color: #b7b7b79a;
    transition: all  0.1s ease-in-out;
}
`
const arrow = <svg viewBox="0 0 451.846 451.847" xmlns="http://www.w3.org/2000/svg">
    <g>
        <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z" />
    </g>
</svg>;
const monthNames = [
    "jan.", "feb.", "mrt.", "apr.", "mei", "jun", "jul", "aug.", "sep.", "okt.", "nov.", "dec."
]
const ViewTools = () => {
    const { show, setShow } = useContext(ShowContext)
    const { startPoint, setStartPoint } = useContext(DateContext)
    const today = new Date().setHours(0, 0, 0, 0);
    const isToday = new Date(startPoint).setHours(0, 0, 0, 0) === today
    const dd = new Date(startPoint).getDate()
    const mm = new Date(startPoint).getMonth()




    return (
        <Container>
            <Button rotate={true} onClick={() => setStartPoint(prev => new Date(prev).setDate(new Date(startPoint).getDate() - 1))}>
                {arrow}
            </Button>
            <Button onClick={() => setShow({ datePicker: !show.datePicker })}>
                <Text>{isToday ? "Vandaag" : `${dd} ${monthNames[mm]}`}</Text>
            </Button>
            <Button onClick={() => setStartPoint(prev => new Date(prev).setDate(new Date(startPoint).getDate() + 1))}>
                {arrow}
            </Button>
        </Container>
    );
}

export default ViewTools;
