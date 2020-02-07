import React from "react";
import styled from "styled-components"

const Container = styled.div`
    justify-self: left;
    align-self:start;
    padding-bottom: 15px;
    width: 100%;
    max-width: 310px
`
const Text = styled.div`
    font-size: ${props => props.defaultFontSize};
    font-weight: 400;
    color: #b7b7b7;
    -webkit-text-fill-color: #b7b7b7;
    line-height: 1.25;
`
const daysInWeek = [
    "zondag",
    "maandag",
    "dinsdag",
    "woensdag",
    "donderdag",
    "vrijdag",
    "zaterdag",
]
const monthsInYear = [
    "jan.",
    "feb.",
    "mrt.",
    "apr.",
    "mei.",
    "jun.",
    "jul.",
    "aug.",
    "sep.",
    "okt.",
    "nov.",
    "dec.",
]

const TimeCard = ({ repeatType, zipcode, zipcodeEnd }) => {
    const start = new Date(zipcode);
    const end = new Date(zipcodeEnd);
    const today = new Date(start).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    const isSameDay = new Date(start).setHours(0, 0, 0, 0) === new Date(end).setHours(0, 0, 0, 0);

    return <Container>
        {isSameDay && <Text>{today ? "Vandaag" : `${daysInWeek[start.getDay()]} ${start.getDate()} ${monthsInYear[start.getMonth()]} ${start.getFullYear()}`}</Text>}
        {isSameDay && <Text>{`van ${start.getHours()}:${start.getMinutes() < 10 ? "0" : ""}${start.getMinutes()} tot ${end.getHours()}:${end.getMinutes() < 10 ? "0" : ""}${end.getMinutes()}`}</Text>}
        {repeatType && <Text>{`herhaal: ${repeatType}`}</Text>}
    </Container>
}
export default TimeCard