import React, { useContext, useState } from "react"
import styled from "styled-components"
import { SelectContext, DateContext, ShowContext } from "../../contexts"

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
    background: #fafafada;
    box-shadow: 0 0 25px 0 #1212121a;
`
const Header = styled.div`
    color: #121212;
    font-size: 12.5px;
    font-weight: 600;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px #b7b7b72e solid;
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
    font-weight: 800;
    font-size: 13.5px;
    color: #121212;
    align-self: center;
`
const Item = styled.a`
    height: 35px;
    font-size: 12.5px;
    padding-left: 15px;
    background: #fff;
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
        background: #f9f9f9da
    }
`

const Text = styled.a`
    justify-self: center;
    align-self: center;
    align-self: center;
    width: 100%;
    padding: 5px 0;
    line-height: 25px;
    font-size: 12.5px;
    text-align: center;
    font-weight: 600;
    color:  ${props => props.theme.primaryFC || "#b7b7b7"};
    transition: all 0.1s ease-in-out;

    &:hover {
        color: ${props => props.theme.primaryFHC || "#b7b7b7"};
        transition: all  0.1s ease-in-out;
    }
`
const ActiveText = styled.a`
    justify-self: center;
    align-self: center;
    align-self: center;
    width: calc(100% - 10px);
    border-radius: 5px;
    margin: 5px 5px;
    padding: 12.5px 0;
    font-size: 12.5px;
    text-align: center;
    font-weight: 600;
    color: white;
    background:  ${props => props.theme.menuIC || "#409fff"};
    transition: all 0.1s ease-in-out;
`

const List = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 5px;
    border-radius: 5px;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    padding: 2.5px 0;
`

const MenuList = ({ allSelect }) => {
    let keys = Object.keys(allSelect)
    const { select, setSelect } = useContext(SelectContext);
    const { show, setShow } = useContext(ShowContext)
    const [active, setActive] = useState(keys[0] || null);
    const showhide = e => {
        setShow({ groupSource: false })
        let key = e.currentTarget.innerText;
        let value = allSelect[key] || "";
        setActive(key);
        setSelect({ id: value, name: key });
    }
    return (
        <Container>
            {/* <Header>Filter</Header> */}
            <Head>Groepen</Head>
            <Section>
                {keys ? keys.map(e => <Item key={e} onClick={showhide}>{e}</Item>) : undefined}
            </Section>
            <Section>
                <Item>Bekijk alle</Item>
            </Section>
            {/* <ActiveText>{select.name}</ActiveText>
            <List>{keys ? keys.map(e => e !== select.name && <Text key={e} onClick={showhide} style={{ background: e === select.name ? "#58585811" : null }}>{e}</Text>) : "undefined"}</List> */}
        </Container>)
}
export default MenuList