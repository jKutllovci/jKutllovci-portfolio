import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Keyframes for animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SkillsSection = styled.section`
  padding: 40px 0;
  text-align: center;
  background-color: #272B29;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0; /* Initially hidden */
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeInUp} 1s ease-out forwards; /* Slide-in animation applied */
    `}
`;

const BackgroundEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #1D1F20, #272B29);
  opacity: 0.8;
  z-index: -1;
`;

const SkillItem = styled.div`
  font-size: 18px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  opacity: 0; /* Initially hidden */
  transform: translateY(20px);
  ${({ isVisible }) =>
    isVisible &&
    css`
      animation: ${fadeInUp} 0.5s ease-out forwards; /* Slide-in animation applied */
    `}

  img {
    width: 200px;
    height: 200px;
    filter: grayscale(100%);
    transition: filter 0.3s, transform 0.3s;
    margin-bottom: 10px;
    margin: 0 auto; /* Center the image horizontally */

    &:hover {
      filter: grayscale(0%);
    }
  }

  p {
    margin-top: 10px;
    color: #FFFFFF;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    img {
      width: 150px;
      height: 150px;
    }

    p {
      font-size: 16px;
    }

    margin: 0 auto; /* Center the SkillItem on smaller screens */
  }
`;

const CustomSlider = styled(Slider)`
  .slick-dots li button:before {
    font-size: 12px;
    color: #2F9F84;
  }

  .slick-dots li.slick-active button:before {
    color: #FFFFFF;
  }

  .slick-list {
    display: flex;
    justify-content: center;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }
`;

const skills = [
  { name: 'Android Development', image: 'android-dev.png' },
  { name: 'Bootstrap', image: 'bootstrap.svg' },
  { name: 'C#', image: 'csharp.svg' },
  { name: 'CSS', image: 'css.png' },
  { name: 'HTML', image: 'html.png' },
  { name: 'Java', image: 'java.png' },
  { name: 'jQuery', image: 'jquery.png' },
  { name: 'JavaScript', image: 'js.png' },
  { name: 'Laravel', image: 'laravel.png' },
  { name: 'MySQL', image: 'mysql.png' },
  { name: 'OctoberCMS', image: 'octoberCMS.png' },
  { name: 'Adobe Photoshop', image: 'photoshop.png' },
  { name: 'PHP', image: 'php.png' },
  { name: 'Python', image: 'python.png' },
  { name: 'React', image: 'react.webp' },
  { name: 'React Native', image: 'react-native.png' },
  { name: 'Spring Boot', image: 'springboot.png' },
  { name: 'Swift UI', image: 'swiftui.png' },
];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (skillsSectionRef.current) {
      observer.observe(skillsSectionRef.current);
    }

    return () => {
      if (skillsSectionRef.current) {
        observer.unobserve(skillsSectionRef.current);
      }
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SkillsSection id="skills" ref={skillsSectionRef} isVisible={isVisible}>
      <BackgroundEffect />
      <h2>Skills</h2>
      <CustomSlider {...settings}>
        {skills.map((skill, index) => (
          <SkillItem key={index} isVisible={isVisible}>
            <img src={require(`../images/skills/${skill.image}`)} alt={skill.name} />
            <p>{skill.name}</p>
          </SkillItem>
        ))}
      </CustomSlider>
    </SkillsSection>
  );
};

export default Skills;
