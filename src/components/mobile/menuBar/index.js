import { NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components"


const Nav = styled.section`
position: fixed;
bottom:0;
height: 50px;
    width: 100%;
grid-column: 1;
grid-row: 3;
display: grid;
grid-template-rows: 1fr;
grid-auto-flow: column;
grid-auto-columns: 1fr;
backdrop-filter: blur(50px) contrast(1.5);
z-index: 10;
background: ${props => props.theme.floatSecBGC || "#f3f3f3da"};
`
const NavItem = styled.div`
background: transparent;
display: grid;
grid-template-rows: 35px 15px;
grid-template-columns: 1fr;
`
const NavTitle = styled.div`
font-size: ${props => props.theme.menuFontSize};
justify-self: center;
align-self: start;
filter: ${props =>  props.route && (props.active === props.route.match.path ?  "contrast(1) opacity(1)" :  "contrast(1.5) opacity(0.5)")};
color: ${props =>  props.route && (props.active === props.route.match.path ? props.theme.menuIC : props.theme.primaryFC)}
-webkit-text-fill-color: ${props =>  props.route && (props.active === props.route.match.path ? props.theme.menuIC : props.theme.primaryFC)}
`

const NavIcon = styled.div`
width: 20px;
height: 20px;
justify-self: center;
align-self: center;
grid-template-rows: 1fr;

${NavTitle}:hover & > svg{
  fill: ${props =>  props.route && (props.active === props.route.match.path ? props.theme.menuIC : props.theme.primaryFHC)}
}

& > svg {
  filter: ${props =>  props.route && (props.active === props.route.match.path ?  "contrast(1) opacity(1)" :  "contrast(1.5) opacity(0.5)")};
  fill: ${props => props.route && (props.active === props.route.match.path ?  props.theme.menuIC : props.theme.primaryFC)};
}
`

const add = (  <svg viewBox="0 0 491.86 491.86" xmlns="http://www.w3.org/2000/svg">
<g>
    <path d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69
      C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69
      s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"/>
  </g>
</svg>)
const blocks = (  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<g>

<path d="M195,0c-8.291,0-15,6.709-15,15v30c0,8.291,6.709,15,15,15s15-6.709,15-15V15C210,6.709,203.291,0,195,0z"/>

<path d="M317,0c-8.291,0-15,6.709-15,15v30c0,8.291,6.709,15,15,15c8.291,0,15-6.709,15-15V15C332,6.709,325.291,0,317,0z"/>

<path d="M437,0c-8.291,0-15,6.709-15,15v30c0,8.291,6.709,15,15,15c8.291,0,15-6.709,15-15V15C452,6.709,445.291,0,437,0z"/>

<path d="M482,32.763V45c0,24.814-20.186,45-45,45c-24.814,0-45-20.186-45-45V30h-30v15c0,24.814-20.186,45-45,45
  c-24.814,0-45-20.186-45-45V30h-32v15c0,24.814-20.186,45-45,45c-24.814,0-45-20.186-45-45V30h-30v15c0,24.814-20.186,45-45,45
  c-24.814,0-45-20.186-45-45V32.763C12.578,38.976,0,55.47,0,75v30v15h512v-15V75C512,55.47,499.422,38.976,482,32.763z"/>

<rect x="241" y="242" width="32" height="30"/>

<rect x="121" y="242" width="30" height="30"/>

<rect x="121" y="362" width="30" height="30"/>

<rect x="241" y="362" width="32" height="30"/>

<path d="M0,150v317c0,24.814,20.186,45,45,45h316.268V377c0-8.291,6.709-15,15-15H512V150H0z M181,407c0,8.291-6.709,15-15,15h-60
  c-8.291,0-15-6.709-15-15v-60c0-8.291,6.709-15,15-15h60c8.291,0,15,6.709,15,15V407z M181,287c0,8.291-6.709,15-15,15h-60
  c-8.291,0-15-6.709-15-15v-60c0-8.291,6.709-15,15-15h60c8.291,0,15,6.709,15,15V287z M303,407c0,8.291-6.709,15-15,15h-62
  c-8.291,0-15-6.709-15-15v-60c0-8.291,6.709-15,15-15h62c8.291,0,15,6.709,15,15V407z M303,287c0,8.291-6.709,15-15,15h-62
  c-8.291,0-15-6.709-15-15v-60c0-8.291,6.709-15,15-15h62c8.291,0,15,6.709,15,15V287z M423,287c0,8.291-6.709,15-15,15h-60
  c-8.291,0-15-6.709-15-15v-60c0-8.291,6.709-15,15-15h60c8.291,0,15,6.709,15,15V287z"/>

<rect x="363" y="242" width="30" height="30"/>

<polygon points="391.268,392 391.268,470.089 469.357,392 		"/>

<path d="M511.778,392l-120,120H467c24.814,0,45-20.186,45-45v-75H511.778z"/>
</g>
</svg>)
const news = (  <svg viewBox="0 0 491.86 491.86" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="m365.964844 0h-320.464844c-24.8125 0-45 20.1875-45 45v422c0 24.8125 20.1875 45 45 45h320.46875c24.8125 0 45-20.1875 45-45v-422c-.003906-24.8125-20.191406-45-45.003906-45zm-52.699219 350h-137.847656c-8.285157 0-15-6.714844-15-15s6.714843-15 15-15h137.847656c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15zm15 61c0 8.285156-6.714844 15-15 15h-137.847656c-8.285157 0-15-6.714844-15-15s6.714843-15 15-15h137.847656c8.285156 0 15 6.714844 15 15zm-174.8125-257.753906c-.222656-.238282-.4375-.480469-.644531-.730469-5.261719-6.371094-13.210938-16-13.207032-29.65625 0-22.367187 18.199219-40.570313 40.566407-40.570313 9.398437 0 18.367187 3.316407 25.472656 9.039063 7.761719-6.34375 17.773437-9.6875 28.296875-9.015625 21.082031 1.347656 37.742188 18.980469 37.929688 40.144531.121093 13.617188-7.0625 23.328125-13.449219 30.296875-.117188.132813-.238281.265625-.363281.398438l-41.398438 44.015625c-2.835938 3.015625-6.789062 4.722656-10.921875 4.722656-.003906 0-.003906 0-.003906 0-4.136719 0-8.085938-1.707031-10.921875-4.714844zm159.8125 120.753906h-137.847656c-8.285157 0-15-6.714844-15-15s6.714843-15 15-15h137.847656c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15zm-200.609375 85.460938c-13.507812 0-24.457031-10.953126-24.457031-24.460938s10.949219-24.460938 24.457031-24.460938c13.511719 0 24.460938 10.953126 24.460938 24.460938s-10.949219 24.460938-24.460938 24.460938zm24.460938 51.539062c0 13.507812-10.949219 24.460938-24.460938 24.460938-13.507812 0-24.457031-10.953126-24.457031-24.460938s10.949219-24.460938 24.457031-24.460938c13.511719 0 24.460938 10.953126 24.460938 24.460938zm-24.460938-127.539062c-13.507812 0-24.457031-10.953126-24.457031-24.460938s10.949219-24.460938 24.457031-24.460938c13.511719 0 24.460938 10.953126 24.460938 24.460938s-10.949219 24.460938-24.460938 24.460938zm0 0"/>
</g>
</svg>)
const menu = (  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<path d="m463.09375 406.492188c31.71875-43.519532 48.90625-95.886719 48.90625-150.503907 0-141.480469-114.496094-255.988281-256-255.988281-141.488281 0-256 114.492188-256 255.988281 0 54.601563 17.179688 106.953125 48.878906 150.464844 102.132813-140.484375 311.9375-140.609375 414.214844.039063zm-297.09375-255.5c0-49.621094 40.375-89.996094 90-89.996094s90 40.375 90 89.996094v30c0 49.625-40.375 89.996093-90 89.996093s-90-40.371093-90-89.996093zm0 0"/><path d="m256 240.988281c33.085938 0 60-26.914062 60-59.996093v-30c0-33.082032-26.914062-59.996094-60-59.996094s-60 26.914062-60 59.996094v30c0 33.082031 26.914062 59.996093 60 59.996093zm0 0"/><path d="m68.757812 430.527344c101.289063 108.601562 273.167969 108.683594 374.550782-.074219-89.375-132.792969-284.695313-132.1875-374.550782.074219zm0 0"/>
</svg>)


let MenuBar = React.memo(({route}) => {




  const navListItems = [
    { icon: blocks, title: "Agenda", link: "/view/" },
    { icon: add, title: "Toevoegen", link: "add/" },
    { icon: news, title: "Documents", link: "/docs/" },
    { icon: menu, title: "Acount", link: "/profile/" },
  ]


  return (
    <Nav>
      {navListItems.map(({ link, icon, title }, i) => {
        return <NavLink
          to={link}
          key={`${link}_${title}`}
        >
          <NavItem>
            <NavIcon route={route} active={link}>{icon}</NavIcon>
            <NavTitle route={route} to="/view/day" active={link} className="title link">{title}</NavTitle>
          </NavItem>
        </NavLink>
})}


      {/* <NavLink to="add/menu" id="add" className="Button link" />
      <Link to="add/menu" className="title link">Toevoegen</Link>

      <NavLink

        to="/docs/mlarooster/huiswerk/"
        id="me"
        activeStyle={NavActive}
        className="Button link"
      />
      <Link
        to="/docs/" className="title link">Voor jou</Link> */}

      {/* <NavLink
        exact
        to="/search/"
        id="search"
        activeStyle={NavActive}
        className="Button"
      />
      <div className="title">Zoek</div> */}

      {/* <NavLink
        exact
        to="/profile/"
        id="profile"
        activeStyle={NavActive}
        className="Button"
      />
      <div className="title">Profiel</div> */}
    </Nav>
  );
});

export default MenuBar;
