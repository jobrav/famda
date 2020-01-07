import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { DateContext, ShowContext } from "../../../contexts";



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
    grid-template-columns: 1fr;
    grid-template-rows: 40px auto 1fr;
    background: ${props => props.theme.floatBGC || "#fafafada"};
    box-shadow: 0 0 25px 0 #1212121a;
    z-index: 10;
`
const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px 40px;
    grid-template-rows: 40px;
    background: ${props => props.theme.secondaryBGC || "#fafafa"};
`
const Text = styled.a`
    justify-self: start;
    margin-left: 20px
    align-self: center;
    color: ${props => props.theme.primaryFC || "#121212da"};
    -webkit-text-fill-color: ${props => props.theme.primaryFC || "#121212da"};
    font-size: ${props => props.theme.defaultFontSize};
    font-weight: 600;
`
const Move = styled.div`
    justify-self: ${props => props.justify || "start"};
    cursor: pointer;
    align-self: center;
    width: 10px;
    padding: 7.5px;
    background-position: center;
    ${props => props.rotate ? "transform: rotate(180deg);" : null}
    
    & > svg{
        fill: ${props => props.theme.primaryFC || "#121212da"};
    }
`
const Picker = styled.div`
    scroll-snap-type: y mandatory;
    grid-column: 1;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-auto-rows: auto;
    height: 375px;
    overflow: auto;
    scroll-behavior: ${props => props.firstScroll ? "inherit" : "smooth"};};
`
const List = styled.div`
    justify-self: center;
    padding: 0 15px;
    background: ${props => props.theme.secondaryBGC || "#fafafa"};
    font-size: ${props => props.theme.defaultFontSize};
    width: calc(100% - 30px);
    align-self: center;
    grid-column: 1;
    display: grid;
    grid-template-columns: repeat(7,1fr);
    grid-template-rows: 1fr;
    border-bottom:  ${props => props.theme.secondaryBGC || "#f3f3f3"} 1px solid;
    `
const ListItem = styled.div`
    justify-self: center;
    align-self: center;
    padding: 1px;
    font-size: ${props => props.theme.subFontSize};
    text-align: center;
    color: ${props => props.theme.primaryFC || "#121212"}
    -webkit-text-fill-color: ${props => props.theme.primaryFC || "#121212"}
`
const Section = styled.div`
    height: 375px;
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
    align-self: start;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 15px;
    padding-top: 5px;
    padding-bottom: 10px;
    width: 100%;
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
    color: ${props => (!props.today && !props.active) ? props.theme.primaryFC : props.theme.primaryFAC};
    -webkit-text-fill-color: ${props => (!props.today && !props.active) ? props.theme.primaryFC : props.theme.primaryFAC};
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


const allowedToMove = (prev, count) => (prev > 0 && count >= 0) || (prev < 24 && count <= 0)

let monthRangeCache = [];
const createMonthRange = () => {
    if (monthRangeCache) {
        const mm = new Date(today).getMonth();
        let bucket = [];
        for (let i = -12; i <= 12; i++) {
            const zipcode = new Date(today).setMonth(mm + i)
            bucket = [...bucket, zipcode]
        }
        monthRangeCache = bucket
        return bucket;
    } else return monthRangeCache;
}
let sectionsCache = [];

const arrow = (
    <svg viewBox="0 0 451.846 451.847" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z" />
        </g>
    </svg>
)

const DatePicker = React.memo(({ }) => {
    const { show, setShow } = useContext(ShowContext)
    const { startPoint, setStartPoint } = useContext(DateContext)
    const [date, setDate] = useState(new Date(today));
    const [objCount, setObjCount] = useState({ count: 12 });
    let currentCount = objCount.count;
    const [firstScroll, setFirstScroll] = useState(true);
    const [sections, setSections] = useState(sectionsCache)

    const scroll = data => {
        const newScroll = Math.round(data.target.scrollTop / 375);
        setDate(() => new Date(startPoint).setMonth(newScroll - 12)) //change date
        if (objCount.count <= newScroll || objCount.count >= newScroll) currentCount = newScroll //change current pos
    }

    useEffect(() => { sectionsCache = sections }, [sections]) //create cache for sections

    useEffect(() => {
        // scroll
        const container = document.getElementById("datePicker")
        if (container.children[objCount.count]) {
            container.scrollTop = container.children[objCount.count].offsetTop;
            setFirstScroll(false);
        }
    }, [objCount, sections])

    const move = (count) => allowedToMove(currentCount, count) && setObjCount({ count: currentCount + count, num: Math.random() });

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
                {/* <Flag /> */}
            </DayContainer >]
        }
        return bucket
    }
    useEffect(() => {
        window.addEventListener("click", clicked) //set event listener
        if (!sections[2]) {
            setSections(() => createMonthRange().map((zipcodeMonth, i) =>
                <Section id={i} key={`${zipcodeMonth}_section`}>
                    {getDays(zipcodeMonth)}
                </Section>))
        }
    }, [show])

    const clicked = e => {
        const key = Container.componentStyle.componentId; //get id container element
        const isKey = e.path.map(i => i.classList && i.classList[0] === key) //loop through path array
        if (!isKey.includes(true)) showhide(); // if doensn't inlcude "true" then hide
    }

    const showhide = _ => {
        setShow({ datePicker: false })//hide container
        window.removeEventListener("click", clicked)//remove event listener
    }


    return (
        <Container onScroll={scroll}>
            <Header>
                <Text>{`${monthNames[date ? new Date(date).getMonth() : undefined]} ${new Date(date).getFullYear()}`}</Text>

                <Move justify="end" rotate="true" onClick={() => move(-1)}>{arrow}</Move>
                <Move justify="start" onClick={() => move(1)}>{arrow}</Move>
            </Header>

            <List>{daysInWeek.map((day, i) => <ListItem key={`${day}_${i}_listitem`}>{day}</ListItem>)}</List>

            <Picker firstScroll={firstScroll} id="datePicker">
                {sections}
            </Picker>
        </Container>)
})
export default DatePicker