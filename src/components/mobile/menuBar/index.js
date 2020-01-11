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
backdrop-filter: blur(25px);
z-index: 10;
background: ${props => props.theme.floatSecBGC || "#f3f3f3da"};
`
const NavItem = styled.div`
background: transparent;
display: grid;
grid-template-rows: 30px 20px;
grid-template-columns: 1fr;
`

const add = (  <svg viewBox="0 0 491.86 491.86" xmlns="http://www.w3.org/2000/svg">
<g>
    <path d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69
      C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69
      s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"/>
  </g>
</svg>)
const blocks = (  <svg viewBox="0 0 491.86 491.86" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="M221.501,0H19.191C10.061,0,2.677,7.387,2.677,16.514v453.33c0,9.129,7.384,16.516,16.515,16.516h202.31
		c9.13,0,16.519-7.387,16.519-16.516V16.514C238.02,7.387,230.631,0,221.501,0z M204.986,453.328H35.707V33.029h169.279V453.328z"/>
	<path d="M467.168,0H281.516c-9.112,0-16.515,7.387-16.515,16.514v196.119c0,9.127,7.403,16.514,16.515,16.514h185.652
		c9.125,0,16.515-7.387,16.515-16.514V16.514C483.683,7.387,476.293,0,467.168,0z M450.653,196.117H298.031V33.029h152.622V196.117z
		"/>
	<path d="M467.168,257.211H281.516c-9.112,0-16.515,7.387-16.515,16.516v196.117c0,9.129,7.403,16.516,16.515,16.516h185.652
		c9.125,0,16.515-7.387,16.515-16.516V273.727C483.683,264.598,476.293,257.211,467.168,257.211z M450.653,453.328H298.031V290.24
		h152.622V453.328z"/>
    </g>
</svg>)
const news = (  <svg viewBox="0 0 491.86 491.86" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="m365.964844 0h-320.464844c-24.8125 0-45 20.1875-45 45v422c0 24.8125 20.1875 45 45 45h320.46875c24.8125 0 45-20.1875 45-45v-422c-.003906-24.8125-20.191406-45-45.003906-45zm-52.699219 350h-137.847656c-8.285157 0-15-6.714844-15-15s6.714843-15 15-15h137.847656c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15zm15 61c0 8.285156-6.714844 15-15 15h-137.847656c-8.285157 0-15-6.714844-15-15s6.714843-15 15-15h137.847656c8.285156 0 15 6.714844 15 15zm-174.8125-257.753906c-.222656-.238282-.4375-.480469-.644531-.730469-5.261719-6.371094-13.210938-16-13.207032-29.65625 0-22.367187 18.199219-40.570313 40.566407-40.570313 9.398437 0 18.367187 3.316407 25.472656 9.039063 7.761719-6.34375 17.773437-9.6875 28.296875-9.015625 21.082031 1.347656 37.742188 18.980469 37.929688 40.144531.121093 13.617188-7.0625 23.328125-13.449219 30.296875-.117188.132813-.238281.265625-.363281.398438l-41.398438 44.015625c-2.835938 3.015625-6.789062 4.722656-10.921875 4.722656-.003906 0-.003906 0-.003906 0-4.136719 0-8.085938-1.707031-10.921875-4.714844zm159.8125 120.753906h-137.847656c-8.285157 0-15-6.714844-15-15s6.714843-15 15-15h137.847656c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15zm-200.609375 85.460938c-13.507812 0-24.457031-10.953126-24.457031-24.460938s10.949219-24.460938 24.457031-24.460938c13.511719 0 24.460938 10.953126 24.460938 24.460938s-10.949219 24.460938-24.460938 24.460938zm24.460938 51.539062c0 13.507812-10.949219 24.460938-24.460938 24.460938-13.507812 0-24.457031-10.953126-24.457031-24.460938s10.949219-24.460938 24.457031-24.460938c13.511719 0 24.460938 10.953126 24.460938 24.460938zm-24.460938-127.539062c-13.507812 0-24.457031-10.953126-24.457031-24.460938s10.949219-24.460938 24.457031-24.460938c13.511719 0 24.460938 10.953126 24.460938 24.460938s-10.949219 24.460938-24.460938 24.460938zm0 0"/>
</g>
</svg>)
const menu = (  <svg viewBox="0 0 491.86 491.86" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="m512 256c0-141.488281-114.496094-256-256-256-141.488281 0-256 114.496094-256 256 0 140.234375 113.539062 256 256 256 141.875 0 256-115.121094 256-256zm-256-226c124.617188 0 226 101.382812 226 226 0 45.585938-13.558594 89.402344-38.703125 126.515625-100.96875-108.609375-273.441406-108.804687-374.59375 0-25.144531-37.113281-38.703125-80.929687-38.703125-126.515625 0-124.617188 101.382812-226 226-226zm-168.585938 376.5c89.773438-100.695312 247.421876-100.671875 337.167969 0-90.074219 100.773438-247.054687 100.804688-337.167969 0zm0 0"/><path d="m256 271c49.625 0 90-40.375 90-90v-30c0-49.625-40.375-90-90-90s-90 40.375-90 90v30c0 49.625 40.375 90 90 90zm-60-120c0-33.085938 26.914062-60 60-60s60 26.914062 60 60v30c0 33.085938-26.914062 60-60 60s-60-26.914062-60-60zm0 0"/>
  </g>
</svg>)


let MenuBar = React.memo(({route}) => {

const NavTitle = styled.div`
font-size: ${props => props.theme.subFontSize};
justify-self: center;
align-self: start;
font-weight: 600;
color: ${props =>  route && (props.active === route.match.path ? props.theme.menuIC : props.theme.primaryFC)}
-webkit-text-fill-color: ${props =>  route && (props.active === route.match.path ? props.theme.menuIC : props.theme.primaryFC)}
`

const NavIcon = styled.div`
width: 15px;
height: 15px;
justify-self: center;
align-self: center;
grid-template-rows: 1fr;

${NavTitle}:hover & > svg{
  fill: ${props =>  route && (props.active === route.match.path ? props.theme.menuIC : props.theme.primaryFHC)}
}

& > svg {
  fill: ${props => route && (props.active === route.match.path ?  props.theme.menuIC : props.theme.primaryFC)};
}
`


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
            <NavIcon active={link}>{icon}</NavIcon>
            <NavTitle to="/view/day" active={link} className="title link">{title}</NavTitle>
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
