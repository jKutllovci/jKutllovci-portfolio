import React from 'react';
import styled, { keyframes } from 'styled-components';
import TypedText from './TypedText';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(135deg, #2F9F84, #2A7D6B);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.1) 20%, transparent 20%);
    background-size: 3px 3px;
    opacity: 0.3;
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  font-size: 3em;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const DeveloperText = styled.p`
  font-size: 1.5em;
  color: #293d38;
  font-family: 'ModeSeven', monospace;
  margin: 20px 0;
  animation: fadeIn 2s ease-in-out;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Navigation = styled.nav`
  margin-top: 30px;
  animation: ${fadeIn} 2s ease-in-out;

  a {
    margin: 0 20px;
    color: white;
    font-size: 1.2em;
    text-decoration: none;
    font-family: 'Lato', sans-serif;
    position: relative;
    padding: 10px 0;
    transition: color 0.3s;

    &:hover {
      color: #293d38; /* Darker green color on hover */
    }

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -5px;
      left: 0;
      background-color: #2A7D6B; /* Darker green underline */
      visibility: hidden;
      transform: scaleX(0);
      transition: all 0.3s ease-in-out;
    }

    &:hover::before {
      visibility: visible;
      transform: scaleX(1);
    }
  }
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
