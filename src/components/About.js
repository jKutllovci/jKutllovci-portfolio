import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import profilePic from '../images/profile.jpeg';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px); /* Slide from bottom */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const textAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  background-color: #272B29;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.1); 
  opacity: 0; 
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeIn} 1s ease-out forwards; 
    `}

  @media (max-width: 768px) {
    padding: 40px 10px; 
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 0 10px #272B29, 0 0 0 15px #2F9F84;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px; /* Adjust size for smaller screens */
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 50%;
`;

const AboutText = styled.div`
  text-align: center;
  color: #ffffff; 
  margin-top: 40px;
  opacity: 0; 
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${textAnimation} 1.5s ease-out forwards; 
    `}

  h2 {
    font-size: 2.5em;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 2em; 
    }
  }

  p {
    font-size: 1.1em;
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 768px) {
      font-size: 1em; 
      max-width: 100%; 
    }
  }
`;

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, []);

  return (
    <AboutSection id="about" ref={aboutSectionRef} isVisible={isVisible}>
      <ProfileContainer>
        <ProfileImage src={profilePic} alt="Profile" />
      </ProfileContainer>
      <AboutText isVisible={isVisible}>
        <h2>About Me</h2>
        <p>
          I'm a skilled developer with a degree in Web & Mobile Computing from Rochester Institute of Technology. I am planning to expand my knowledge and put my skills to good use.
        </p>
      </AboutText>
    </AboutSection>
  );
};

export default About;
