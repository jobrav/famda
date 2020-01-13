import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { SelectContext, DateContext, ShowContext } from "../../../contexts"

const Container = styled.div`
    position: absolute;
    padding-top: 10px;
    top: 55px;
    left: 15px;
    width: 250px;
    border-radius: 5px;
    backdrop-filter: blur(25px);
    display: grid;
    overflow: auto;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-auto-rows: auto;
    overflow-x: hidden;
    background: ${props => props.theme.floatBGC || "#fafafada"};
    box-shadow: 0 0 25px 0 #1212121a;
    z-index: 10;
`
const Section = styled.div`
    margin-bottom: 10px;
    padding: 0 15px;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-auto-rows: 36px;
    `
const Head = styled.div`
    margin: 5px 0;
    padding: 0 15px;
    font-weight: 500;
    font-size: ${props => props.theme.defaultFontSize};
    color: ${props => props.theme.primaryFC || "#121212da"};
    -webkit-text-fill-color: ${props => props.theme.primaryFC || "#121212da"};
    align-self: center;
    `
const Item = styled.a`
    font-weight: 400;
    height: 35px;
    font-size: ${props => props.theme.defaultFontSize};
    padding-left: 15px;
    background: ${props => props.theme.secondaryBGC || "#fafafada"};
    color: ${props => props.theme.primaryFC || "#121212"};
    -webkit-text-fill-color: ${props => props.theme.primaryFC || "#121212"};
    display: flex;
    align-items: center;
    border-bottom: 1px #b7b7b72e solid;
    transition: all 50ms ease-in-out;

    &:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    &:last-child{
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-bottom: none;
    }
    &:hover{
        color: ${props => props.theme.primaryFHC || "#121212da"};
        -webkit-text-fill-color: ${props => props.theme.primaryFHC || "#121212da"};
    }
`


const MenuList = ({ allSelect }) => {
    let keys = Object.keys(allSelect)
    const { select, setSelect } = useContext(SelectContext);
    const { show, setShow } = useContext(ShowContext)
    const [active, setActive] = useState(keys[0] || null);

    const change = e => {
        let key = e.currentTarget.innerText;
        let value = allSelect[key] || "";
        setActive(key);
        setSelect({ id: value, name: key });
        showhide()
    }

    useEffect(() => {
        window.addEventListener("click", clicked) //set event listener
    }, [show])
    const clicked = e => {
        const key = Container.componentStyle.componentId; //get id container element
        const isKey = e.path.map(i => i.classList && i.classList[0] === key) //loop through path array
        if (!isKey.includes(true)) showhide(); // if doensn't inlcude "true" then hide
    }

    const showhide = _ => {
        setShow({ groupSource: false })//hide container
        window.removeEventListener("click", clicked)//remove event listener
    }




    return (
        <Container>
            {/* <Header>Filter</Header> */}
            <Head>Groepen</Head>
            <Section>
                {keys ? keys.map(e => <Item key={e} onClick={change}>{e}</Item>) : undefined}
            </Section>
            <Section>
                <Item>Bekijk alle</Item>
            </Section>
            {/* <ActiveText>{select.name}</ActiveText>
            <List>{keys ? keys.map(e => e !== select.name && <Text key={e} onClick={showhide} style={{ background: e === select.name ? "#58585811" : null }}>{e}</Text>) : "undefined"}</List> */}
        </Container>)
}
export default MenuList