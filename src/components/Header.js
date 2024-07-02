import React from 'react';
import styled from 'styled-components';
import TypedText from './TypedText';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 40px 0;
  background-color: #2F9F84;  
`;

const Title = styled.h1`
  font-family: 'Lato', sans-serif; 
  color: white;  
`;

const Navigation = styled.nav`
  margin-top: 20px;

  a {
    margin: 0 15px;
    color: white;  /* Updated link color */
    font-size: 18px;
    text-decoration: none;
    font-family: 'Lato', sans-serif; /* Apply the Lato font */
  }
`;
const DeveloperText = styled.p`
  font-size: 24px;  /* Make the text larger */
  color: #293d38;
  font-family: 'ModeSeven', monospace; /* Apply the terminal-like font */
`;

const Header = () => (
  <HeaderContainer>
    <Title>Jon Kutllovci</Title>
    <DeveloperText>
      <TypedText />
    </DeveloperText>
    <Navigation>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </Navigation>
  </HeaderContainer>
);

export default Header;
