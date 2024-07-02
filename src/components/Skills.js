import React from 'react';
import styled from 'styled-components';

const SkillsSection = styled.section`
  padding: 40px 0;
  text-align: center;
  background-color: #272B29;  /* Updated background color */
`;

const SkillList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SkillItem = styled.li`
  margin: 10px 20px;
  font-size: 18px;
  color: #2F9F84;  /* Updated text color */
  text-align: center;

  img {
    width: 50px;
    height: 50px;
    filter: grayscale(100%);
    transition: filter 0.3s;
  }

  img:hover {
    filter: grayscale(0%);
  }

  p {
    margin-top: 10px;
  }
`;

const skills = [
  { name: 'UI/UX', image: 'uiux.png' },
  { name: 'Java', image: 'java.png' },
  { name: 'C#', image: 'csharp.png' },
  { name: 'HTML/CSS', image: 'htmlcss.png' },
  { name: 'Adobe Photoshop/Illustrator', image: 'photoshop.png' },
  { name: 'MySQL', image: 'mysql.png' },
  { name: 'PHP', image: 'php.png' },
//   { name: 'JavaScript', image: 'javascript.png' },
//   { name: 'jQuery', image: 'jquery.png' },
//   { name: 'Bootstrap', image: 'bootstrap.png' },
//   { name: 'React.js', image: 'react.png' },
//   { name: 'OctoberCMS', image: 'octobercms.png' },
//   { name: 'Laravel', image: 'laravel.png' },
//   { name: 'Python', image: 'python.png' },
//   { name: 'React-native', image: 'reactnative.png' },
//   { name: 'Java Springboot', image: 'springboot.png' }
];

const Skills = () => (
  <SkillsSection id="skills">
    <h2>Skills</h2>
    <SkillList>
      {skills.map((skill, index) => (
        <SkillItem key={index}>
          <img src={require(`../images/skills/${skill.image}`)} alt={skill.name} />
          <p>{skill.name}</p>
        </SkillItem>
      ))}
    </SkillList>
  </SkillsSection>
);

export default Skills;
