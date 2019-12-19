import React, { useContext, useState } from "react"
import styled from "styled-components"
import { SelectContext, DateContext } from "../../contexts"

const Container = styled.div`
    position: absolute;
    top: 55px;
    left: 15px;
    width: 300px;
    min-height: 200px;
    max-height: 250px;
    border-radius: 5px;
    background: #efefefb9;
    backdrop-filter: blur(25px);
    display: grid;
    overflow: auto;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
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
    const { show, setShow } = useContext(DateContext)
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
            <ActiveText>{select.name}</ActiveText>
            <List>{keys ? keys.map(e => e !== select.name && <Text key={e} onClick={showhide} style={{ background: e === select.name ? "#58585811" : null }}>{e}</Text>) : "undefined"}</List>
        </Container>)
}
export default MenuList