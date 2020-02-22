import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

//styling 
const Section = styled.div`
  position: fixed;
  top: 7.5px;
  right: 15px;
  z-index: 10;
  display: grid;
  grid-template-columns:repeat(2,1fr);
  grid-template-rows: 1fr;
  column-gap: 5px;
`
const Container = styled(Link)`
    display:flex;
  border-radius: 25px;
  background: ${({ theme: { gray5 } }) => gray5}da;
  backdrop-filter: blur(20px) saturate(180%);
`
const Icon = styled.svg`
  border-radius: 25px;
  height: 12.5px;
  width: 12.5px;
  padding: 10px;
  fill: ${({ theme: { blue } }) => blue};
`

const Text = styled.h4`
justify-self:center;
margin:0;
padding:0;
font-size: ${props => props.theme.defaultFontSize};
font-weight: 500;
color: ${({ theme: { hueReverse } }) => hueReverse};
-webkit-text-fill-color:  ${({ theme: { hueReverse } }) => hueReverse};
text-align: center;
`
const dots = <g><path d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
    <path d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
    <path d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" /></g>

const plus =    <path d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69
C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69
s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"/>


const ToolbarTop = React.memo(({ listArr,view,changeView }) => {
    const start = listArr.findIndex(e => e === view);
    const [count,setCount] = useState(start || 0);
    const next = () => {
        setCount(e => e < 2 ? e += 1 : 0);
        localStorage.setItem('startView', listArr[count])
        changeView(listArr[count])
    }

    return (
        <Section>
            <Container to='./' onClick={next}>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 515.555 515.555">
                {dots}
                </Icon>
            </Container>
            <Container to="add/">
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.86 491.86">
                {plus}
                </Icon>
            </Container>
        </Section >
    );
})

export default ToolbarTop;