import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    position: fixed;
    top: ${props => props.posY || 0}px;
    left: ${props => props.posX || 0}px;
    width: 200px;
    padding: 5px
    border-radius: 10px;
    background: ${props => props.theme.secondaryBGC || "#fff"};
    z-index: 20;
    box-shadow: 0 0 5px 0 #1212121c;
`
const Text = styled.div`
    font-size: ${props => props.theme.defaultFontSize || "13px"};
    color: ${props => props.theme.primaryFC};
    -webkit-text-fill-color: ${props => props.theme.primaryFC};;
    font-weight: 400;
`
const LinkBase = styled(Link)`
    display: flex;
    flex-flow: row;
    padding: 7.5px 5px;
    border-bottom: 1px solid ${props => props.theme.primaryBGC || "#fff"}1c;
    &:hover div{
        color: ${props => props.theme.primaryFHC};
    }
    & > svg{
        width: 12.5px;
        fill: #007aff;
        padding: 0 10px 0 5px;
    }
    &:first-child{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    &:last-child{
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-bottom: none;
    }
`
const add = (  <svg viewBox="0 0 491.86 491.86" xmlns="http://www.w3.org/2000/svg">
<g>
    <path d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69
      C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69
      s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"/>
  </g>
</svg>)
const ContextMenu = ({ contextPos }) => {
    return <Container posY={contextPos.y} posX={contextPos.x} >
        <LinkBase to="add">
            {add}
            <Text>Maak afspraak</Text>
        </LinkBase>
        <LinkBase>
            <Text>Nog een optie</Text>
        </LinkBase>
        <LinkBase>
            <Text>Nog een optie</Text>
        </LinkBase>
    </Container>
}
export default ContextMenu;