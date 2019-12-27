import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  border-right: 1px #f3f3f3 solid;
  position: relative;
  padding-top: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  scroll-snap-align: end;
`
const LinkBase = styled.a`
display: flex;
flex-flow: row;
width: calc(90% - 15px);
background: #f6f8fa;
padding: 7.5px 7.5px;
margin-bottom: 10px;
border-radius: 8px;
height: 22.5px;
`
const Icon = styled.div`
height: 22.5px;
width: 22.5px;
margin-right: 7.5px;
border-radius: 25px;
background: #007aff;
`
const Text = styled.div`
    font-size: 12.5px;
    color: #727272;
    font-weight: 600;
    justify-self: start;
    align-self: center;
    color: #b7b7b7;
    &:hover{
        color: #b7b7b7;
        transition: all 50ms ease-in-out;
    }
`
const Link = styled(LinkBase)`
padding-left: ${props => props.active ? "calc(10% + 7.5px) !important" : null};
background: ${props => props.active ? "#f3f3f3 !important" : null};
border-radius: ${props => props.active ? "0 !important" : null};
transition: all 50ms ease-in-out;
`

const ItemList = ({ items, active, click }) => {
    return (<Container>
        {items.map(e => (
            <Link active={active === e.title} onClick={() => click(e.title)}>
                {e.icon ? <Icon /> : null}
                <Text>{e.title}</Text>
            </Link>)
        )}
    </Container>)
}
export default ItemList;