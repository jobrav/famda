import React from "react";
import Header from "../header";
import styled from "styled-components"

const Section = styled.section`
background: ${props => props.theme.primaryBGC || "#fff"};
border-radius: 0;
height: 100%;
grid-column: 2;
grid-row: 2;
border-top: ${props => props.theme.secondaryBGC || "#f3f3f3"} 1px solid;
display: grid;
grid-template-columns: 1fr minmax(200px,250px);
padding: 15px;
grid-template-rows: auto 1fr;
`
const SettingContainer = styled.div`
margin-top: 15px;
height: 100%;
width: 100%;
grid-column: 2;
grid-row: 2;
display: grid;
grid-template-columns: 1fr;
grid-auto-flow: row;
grid-auto-rows: 40px;
`
const Text = styled.div`
cursor: ${props => props.select ? "text" : "default"};
align-self: ${props => props.align || "none"};
justify-self: ${props => props.justify || "none"};
font-weight: ${props => props.bold ? "600" : "300"};
color: ${props => props.theme.primaryFC || "#272727"};
`
const TextM = styled(Text)`
font-size: 12.5px;

& > svg{
  fill: ${props => props.theme.primaryFC || "#272727"};
  width: 15px;
  cursor: pointer;
  padding: 5px 0;
}
`
const ProfilePic = styled.img`
 width: 25px;
 height: 25px
 border-radius: 25px;
 justify-self: center;
 align-self: center;
`
const UserInfoCard = styled.div`
display: grid;
position: relative;
background: ${props => props.theme.secondaryBGC || "#f3f3f3"}
border-radius: 5px;
width: 100%;
height: 50px;
grid-row: 1;
grid-column: 2;
grid-template-columns: 50px auto 50px;
grid-template-rows: 1fr;
grid-gap: 0 5px;
`
const SettingBlock = styled.div`
display: grid;
background: ${props => props.theme.secondaryBGC || "#f3f3f3"}
padding-left: 15px;
height: 100%;
&:first-child{
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
&:last-child{
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
`
const SettingBlockSwitch = styled(SettingBlock)`
grid-template-columns: auto 50px;
grid-template-rows: 1fr;
grid-gap: 0 5px;
`
const Profile = ({ user, settings }) => {
  return (
    <Section>
      <UserInfoCard >
        {user && <ProfilePic style={{ background: `url("data:image/jpeg;base64,${user ? user.picture : null}")` }} />}
        <TextM justify="start" align="center" bold>{user ? user.firstName : null}</TextM>
        <TextM justify="center" align="center" bold>
          <svg viewBox=" 0 20 65 20" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z" />
              <path d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z" />
              <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z" />
            </g>
          </svg>

        </TextM>
      </UserInfoCard>
      <SettingContainer>
        <SettingBlockSwitch onClick={() => settings("darkmode")}>
          <TextM justify="start" align="center" bold>Darkmode</TextM>
        </SettingBlockSwitch>
      </SettingContainer>
    </Section>
  );
};
export default Profile;
