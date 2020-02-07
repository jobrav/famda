import React from "react";
import styled from "styled-components"
import { Route, Link } from "react-router-dom";


const Section = styled.section`
    grid-row:1/4;
   grid-column:1;
   justify-self:stretch;
   align-self:stretch;
   padding: 0 20px;
   background: ${({ theme: { darkMode, hue, gray6 } }) => darkMode ? hue : gray6};

   display:grid;
   grid-template-column:1fr;
   grid-template-rows: 100px;
   grid-auto-flow:row;
   grid-auto-rows: max-content;
    `
const Title = styled.h1`
    margin:0;
    padding:0;
    color: ${props => props.theme.primaryFC};
    -webkit-text-fill-color: ${props => props.theme.primaryFC};
    // font-family: -apple-system-headline, sans-serif;
    font-size: 2em;
    text-align:left;
`
const PageTitle = styled(Title)`
    grid-column:1;
    grid-row:1;
    justify-self:start;
    align-self:end;
`
const ProfilePic = styled(Link)`
    overflow:hidden;
    grid-row: 1;
    grid-column:1;
    width: 2em;
    height: 2em;
    border-radius: 25px;
    justify-self: end;
    align-self: end;
    margin-bottom: 2.5px;
    background: ${props => props.img || "#b7b7b7"};
    background-size:cover;
    background-position:center;
`

const ListContainer = styled.div`
    margin-top: 15px
    padding-left: 20px;
    grid-column:1;
    display:grid;
    grid-auto-flow:row;
    grid-auto-rows: max-content;
    border-radius: 10px;
    overflow:hidden;
    background: ${({ theme: { darkMode, hue, gray6 } }) => darkMode ? gray6 : hue};
`
const ListItem = styled(Link)`
    justify-self:stretch;
    padding-right:10px;
    width: calc(100% - 10px);
    display: grid;
    grid-template-columns: repeat(2,max-content) 1fr;
    grid-template-rows: 1fr;
    height: 55px;
    border-bottom: 1px #b7b7b766 solid;

    &:last-child{
        border:none;
    }
    &:hover{
        background: ${props => props.theme.tertiaryBGC};
        transition: transform 50ms ease-in-out;
    }
`
const Name = styled.p`
    margin: 0;
    font-weight:600;
    font-weight: 500;
    padding: 0;
    color: ${props => props.theme.hueReverse};
    -webkit-text-fill-color: ${props => props.theme.hueReverse};
    font-size: 1em;
    text-align: left;
    justify-self: start;
    align-self: center;
`
const Arrow = styled.svg`
fill: #b7b7b7;
justify-self: end;
align-self: center;
grid-column:3;
height: 12.5px;
`
const arrow = <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z" />


const Explore = ({ userData, route: { match: { params } } }) => {


    return <Section className={["pannel", "returnPannel", "nonePannel"][Object.values(params).length]}>
        {/* Header */}
        <PageTitle>Ontdekken</PageTitle>
        <ProfilePic to="profile" img={`url("data:image/jpeg;base64,${userData ? userData.picture : null}")`} />


        <ListContainer>
            {[{ title: "Agenda", link: "/view" }, { title: "Documenten", link: "/docs/" }, { title: "Projecten", link: "/projects/" }].map(({ title, link }, i) => <ListItem to={link} key={i}>
                {/* <Theme color={e.theme} /> */}
                <Name>{title}</Name>
                <Arrow viewBox="0 0 451.846 451.847" xmlns="http://www.w3.org/2000/svg">
                    {arrow}
                </Arrow>
            </ListItem>)}
        </ListContainer>
    </Section>
}
export default Explore;