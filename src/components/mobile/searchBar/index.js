import React from "react";
import styled from "styled-components";

const Container = styled.div`
border-radius: 7.5px;
display: grid;
justify-self:stretch;
margin: 5px 0;
align-self:center;
height:calc(100% - 10px);
grid-template-columns: 30px auto 30px;
background: ${props => props.theme.darkMode ? props.theme.secondaryBGC : "#d1d1d699"};
`
const Text = styled.input`
all: unset;
font-size: ${props => props.theme.defaultFontSize};
grid-column: 2;
justify-self:stretch;
align-self:center;
font-weight: 400;
color: ${props => props.theme.primaryFC || "#121212"};
-webkit-text-fill-color: ${props => props.theme.primaryFC || "#121212"};
&::placeholder {
  color:  ${props => props.theme.primaryFHC || "#121212"};
  -webkit-text-fill-color:  ${props => props.theme.primaryFHC || "#121212"};
}
`
const Icon = styled.svg`
grid-column: 1;
width: 15px;
height: 15px;
justify-self: center;
align-self: center;
fill: ${props => props.theme.primaryFHC};
`
const Cancel = styled(Icon)`
grid-column: 3;
grid-row:1;
width:10px;
height:10px;
cursor: pointer;
`


//icons
const closeIcon = <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>

const searchIcon = <g><path d="M273.587,214.965c49.11-49.111,49.109-129.021,0-178.132c-49.111-49.111-129.02-49.111-178.13,0
  C53.793,78.497,47.483,140.462,76.51,188.85c0,0,2.085,3.498-0.731,6.312c-16.065,16.064-64.263,64.263-64.263,64.263
  c-12.791,12.79-15.836,30.675-4.493,42.02l1.953,1.951c11.343,11.345,29.229,8.301,42.019-4.49c0,0,48.096-48.097,64.128-64.128
  c2.951-2.951,6.448-0.866,6.448-0.866C169.958,262.938,231.923,256.629,273.587,214.965z M118.711,191.71
  c-36.288-36.288-36.287-95.332,0.001-131.62c36.288-36.287,95.332-36.288,131.619,0c36.288,36.287,36.288,95.332,0,131.62
  C214.043,227.996,155,227.996,118.711,191.71z"/>
<g>
  <path d="M126.75,118.424c-1.689,0-3.406-0.332-5.061-1.031c-6.611-2.798-9.704-10.426-6.906-17.038
    c17.586-41.559,65.703-61.062,107.261-43.476c6.611,2.798,9.704,10.426,6.906,17.038c-2.799,6.612-10.425,9.703-17.039,6.906
    c-28.354-11.998-61.186,1.309-73.183,29.663C136.629,115.445,131.815,118.424,126.75,118.424z"/>
</g></g>

const SearchBar = React.memo(({ srchCtx, changeSrchCtx }) => {
  const clear = e => {
    e.currentTarget.previousSibling.value = ""
    changeSrchCtx("")
  }
  return (
    <Container>
      <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310.42 310.42">{searchIcon}</Icon>
      <Text
        type="text"
        name="search"
        placeholder="Zoeken"
        onChange={e => changeSrchCtx(e.currentTarget.value)}
      />
      {srchCtx ? <Cancel align="end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.971 47.971" onClick={clear}>{closeIcon}</Cancel> : null}
    </Container>
  );
})
export default SearchBar
