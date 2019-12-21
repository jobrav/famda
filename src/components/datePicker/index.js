import React, { useState, useEffect, useContext } from "react"
import arrow from "./arrow.svg";
import styled from "styled-components"
import { DateContext } from "../../contexts";



const Container = styled.div`
    position: absolute;
    overflow: hidden;
    top: 55px;
    right: 15px;
    width: 250px;
    min-height: 300px;
    border-radius: 5px;
    backdrop-filter: blur(25px);
    display: grid;
    grid-template-columns: 1fr 40px 40px;
    grid-template-rows: 40px auto 1fr;
    background: #fafafada;
    box-shadow: 0 0 25px 0 #1212121a;
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
    scroll-snap-type: y mandatory;
    grid-column: 1/4;
    width: calc(100% + 16px);
    background: #f3f3f3;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-auto-rows: auto;
    max-height: 360px;
    overflow: auto;
    scroll-behavior: ${props => props.firstScroll ? "inherit" : "smooth"};
`
const Section = styled.div`
    scroll-snap-align: start;
    padding: 0px 15px 5px 15px;
    width: calc(100% - 30px);
    display: grid;
    grid-template-columns: repeat(7,auto);
    grid-auto-flow: row;
    grid-auto-rows: auto;
`
const DayContainer = styled.a`
    justify-self: center;
    align-self: center;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 15px;
    padding-top: 5px;
    padding-bottom: 10px;
    width: 100%;
    height: 100%;
    grid-column: ${props => props.pos || null};
    border-top: 1px #b7b7b72e solid;
`
const Day = styled.div`
    justify-self: center;
    align-self: center;
    text-align: center;
    width: 20px;
    padding: 2.5px;
    border-radius: 25px;
    color: ${props => (!props.today && !props.active) ? "#121212" : props.theme.primaryFAC};
    background: ${props => props.active ? "#b7b7b7" : null};
    background: ${props => props.today ? "#007aff" : null};
`
const Flag = styled.div`
    justify-self: center;
    align-self: center;
    text-align: center;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background: #b7b7b7;
`

const monthNames = [
    "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
]
const daysInWeek = ["M", "D", "W", "D", "V", "Z", "Z"];

const today = new Date().setHours(0, 0, 0, 0);


const allowedToMove = (objCount, count) => (objCount > 0 && count >= 0) || (objCount < 24 && count <= 0)

const DatePicker = React.memo(({ }) => {

    const { startPoint, setStartPoint } = useContext(DateContext)
    const [date, setDate] = useState(new Date(today));
    const [objCount, setObjCount] = useState(12);
    const [firstScroll, setFirstScroll] = useState(true);

    const createMonthRange = () => {
        const mm = new Date(today).getMonth();
        let bucket = [];
        for (let i = -12; i <= 12; i++) {
            const zipcode = new Date(today).setMonth(mm + i)
            bucket = [...bucket, zipcode]
        }
        return bucket;
    }

    useEffect(() => {
        // set date
        const newDate = new Date(startPoint).setMonth(objCount - 1)
        setDate(newDate)

        // scroll
        const container = document.getElementById("datePicker")
        const obj = container.children[objCount].offsetTop;
        container.scrollTop = obj;
        setFirstScroll(false);
    }, [objCount])

    const move = count => allowedToMove(objCount, count) && setObjCount(prev => prev + count)
    const link = zipcode => setStartPoint(zipcode)

    const getDays = (monthZipcode) => {
        let bucket = [];
        const zipcode = new Date(monthZipcode).setHours(0, 0, 0, 0)
        const day = new Date(zipcode).getDate();
        const dayInWeek = new Date(zipcode).getDay() + 1;
        const year = new Date(zipcode).getFullYear();
        const month = new Date(zipcode).getMonth() + 1;
        const days = new Date(year, month, 0).getDate()

        for (let i = 1; i <= days; i++) {
            const isToday = new Date(today).valueOf() === new Date(zipcode).setDate(i);
            const isActive = new Date(startPoint).valueOf() === new Date(zipcode).setDate(i);

            bucket = [...bucket, <DayContainer onClick={() => link(new Date(zipcode).setDate(i))} pos={i === 1 && dayInWeek} key={`${i}_day`}>
                <Day today={isToday} active={isActive}>{i}</Day>
                <Flag />
            </DayContainer >]
        }
        return bucket
    }


    return (
        <Container>
            <Text>{`${monthNames[date ? new Date(date).getMonth() : undefined]} ${new Date(date).getFullYear()}`}</Text>
            <Move justify="end" rotate="true" src={arrow} onClick={() => move(-1)}></Move>
            <Move justify="start" src={arrow} onClick={() => move(1)}></Move>
            <List>{daysInWeek.map((day, i) => <ListItem key={`${day}_${i}_listitem`}>{day}</ListItem>)}</List>
            <Picker firstScroll={firstScroll} id="datePicker">{createMonthRange().map((zipcodeMonth, i) =>
                <Section id={i} key={`${zipcodeMonth}_section`}>
                    {getDays(zipcodeMonth)}
                </Section>)}
            </Picker>
        </Container>)
})
export default DatePicker