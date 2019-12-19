import React, { useState, useEffect } from "react"
import arrow from "./arrow.svg";
import styled from "styled-components"

const Container = styled.div`
    position: absolute;
    top: 55px;
    right: 15px;
    width: 250px;
    min-height: 200px;
    border-radius: 5px;
    background: #f3f3f3da;
    backdrop-filter: blur(25px);
    display: grid;
    grid-template-columns: 1fr 40px 40px;
    grid-template-rows: 40px auto 1fr;
`
const Text = styled.a`
    justify-self: start;
    margin-left: 20px
    align-self: center;
    color: #272727;
    font-size: 12.5px;
    font-weight: 600;
`
const Move = styled.img`
    justify-self: ${props => props.justify || "start"};
    cursor: pointer;
    align-self: center;
    width: 10px;
    height: 10px;
    padding: 7.5px;
    background-position: center;
    ${props => props.rotate ? "transform: rotate(180deg);" : null}
`
const List = styled.div`
    background: #f3f3f3da;
    justify-self: center;
    padding: 0 15px;
    font-size: 12.5px;
    width: calc(100% - 30px);
    align-self: center;
    grid-column: 1/4;
    display: grid;
    grid-template-columns: repeat(7,1fr);
    grid-template-rows: 1fr;
    border-bottom: 1px #e6e6e6  solid;
    `
const ListItem = styled.div`
    justify-self: center;
    align-self: center;
    padding: 1px;
    font-size: 8px;
    text-align: center;
    color: ${props => props.theme.primaryFC || "#121212"}
`
const Picker = styled.div`
    grid-column: 1/4;
    padding: 0 15px;
    width: calc(100% - 30px);
    background: #f3f3f3;
    display: grid;
    grid-template-columns: repeat(7,auto);
    grid-auto-flow: row;
    grid-auto-rows: 50px;
`
const Day = styled.a`
    justify-self: center;
    align-self: center;
    text-align: center;
    width: 20px;
    padding: 2.5px;
    border-radius: ${props => props.today ? "25px" : "0px"}
    grid-column: ${props => props.pos || null};
    color: ${props => !props.today ? props.theme.primaryFC || "#121212" : props.theme.primaryFAC};
    background: ${props => props.today ? "#007aff" : null}
`

const monthNames = [
    "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
]
const daysInWeek = ["M", "D", "W", "D", "V", "Z", "Z"]

const today = new Date().setHours(0, 0, 0, 0);
const DatePicker = ({ }) => {
    const [date, setDate] = useState(null);
    useEffect(() => {
        const setup = _ => {
            setDate(new Date(today))
        };
        setup()
    }, [])

    const move = count => {
        const month = date.getMonth() + count;
        const newDate = new Date(date.setMonth(month))
        setDate(newDate)
    }
    const getDays = (zipcode) => {
        let bucket = [];
        const day = new Date(zipcode).getDate();
        const dayInWeek = new Date(zipcode).getDay();
        const year = new Date(zipcode).getFullYear();
        const month = new Date(zipcode).getMonth() + 1;
        const days = new Date(year, month, 0).getDate()
        for (let i = 1; i <= days; i++) {
            const isToday = new Date(today).valueOf() === new Date(date).setDate(i);
            bucket = [...bucket, <Day pos={i === 1 && dayInWeek} today={isToday}>{i}</Day>]
        }
        return bucket
    }


    return (
        <Container>
            <Text>{`${monthNames[date ? date.getMonth() : undefined]} ${new Date(date).getFullYear()}`}</Text>
            <Move justify="end" rotate src={arrow} onClick={() => move(-1)}></Move>
            <Move justify="start" src={arrow} onClick={() => move(1)}></Move>
            <List>{daysInWeek.map(day => <ListItem>{day}</ListItem>)}</List>
            <Picker>{getDays(date)}</Picker>
        </Container>)
}
export default DatePicker