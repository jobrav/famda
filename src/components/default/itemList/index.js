import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  border-right:  ${props => props.theme.secondaryBGC || "#f3f3f3"} 1px solid;
  position: relative;
  padding-top: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  scroll-snap-align: end;
`
const LinkBase = styled.a`
    display: flex;
    width: calc(90% - 15px);
    background:  ${props => props.theme.secondaryBGC || "#f3f3f3"};
    padding: 7.5px 7.5px;
    margin-bottom: 10px;
    border-radius: 8px;
    min-height: 22.5px;
    flex-wrap: wrap;
`
const Icon = styled.div`
    height: 22.5px;
    width: 22.5px;
    margin-right: 7.5px;
    border-radius: 25px;
    background: #007aff;
`
const Text = styled.div`
    font-size: ${props => props.theme.defaultFontSize};
    color: ${props => props.theme.primaryFC || "#fff"};
    -webkit-text-fill-color: ${props => props.theme.primaryFC || "#fff"};
    font-weight: 600;
    justify-self: start;
    align-self: center;
`
const Description = styled.div`
    padding: 2.5px 0;
    width: 100%;
    font-size: ${props => props.theme.subFontSize};
    font-weight: 400;
    justify-self: start;
    align-self: center;
    color: ${props => props.theme.secondaryFC || "#d3d3d3"};
    -webkit-text-fill-color: ${props => props.theme.secondaryFC || "#d3d3d3"};
    align-self: flex-end;
`

const Link = styled(LinkBase)` 
padding-left: ${props => props.active ? "calc(10% + 7.5px) !important" : null};
background: ${props => props.active ? props.theme.secondaryBGC || "#f3f3f3 !important" : null};
border-radius: ${props => props.active ? "0 !important" : null};
transition: all 50ms ease-in-out;
`

const ItemList = ({ items, active, click }) => {
    return (<Container>
        {items.map(item => (
            <Link active={active === item.title} onClick={() => click(item.title)}>
                {item.icon ? <Icon /> : null}
                <Text>{item.title}</Text>
                {item.description ? <Description>{item.description}</Description> : null}
            </Link>)
        )}
    </Container>)
}
export default ItemList;