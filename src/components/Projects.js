import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const ProjectsSection = styled.section`
  padding: 40px 0;
  text-align: center;
  background-color: #2f9f84; /* Updated background color */
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Box shadow for depth */

  @media (max-width: 768px) {
    padding: 20px 0; /* Reduce padding for smaller screens */
  }
`;

const ProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 30px; /* Gap between project items */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
    align-items: center; /* Center items vertically */
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ProjectItem = styled.div`
  width: 300px;
  background-color: #272b29; /* Dark background color for project items */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Box shadow for each project item */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  margin-bottom: 30px; /* Space between items */
  animation: ${floatAnimation} 3s ease infinite;
  animation-delay: ${({ delay }) => `${delay}s`}; /* Staggered animation delay */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Increase shadow on hover */
  }

  &:hover ~ div {
    transform: translateX(20px);
  }

  &:hover ~ div:hover {
    transform: translateX(0);
  }

  h3 {
    margin-bottom: 10px;
    font-size: 1.5em;
    color: #ffffff; /* Title color */
  }

  p {
    color: #c5c6c7; /* Description color */
  }

  @media (max-width: 768px) {
    width: calc(100% - 40px); /* Full width minus padding for better spacing */
    max-width: 100%; /* Maximum width on smaller screens */
    margin-bottom: 30px; /* Space between items */
  }
`;

const Projects = () => {
  const [githubProjects, setGithubProjects] = useState([]);
  const [manualProjects] = useState([
    { title: 'Gjej.com', description: 'A platform providing information for every product or service of every business in Kosovo.' },
    { title: 'Kvik Booking', description: 'A booking application built with HTML, Bootstrap, CSS, JavaScript, and PHP.' },
    // Add more manual projects as needed
  ]);

  useEffect(() => {
    // Fetch GitHub repositories dynamically
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/jKutllovci/repos');
        if (response.ok) {
          const data = await response.json();
          setGithubProjects(data); // Update state with fetched repositories
        } else {
          throw new Error('Failed to fetch repositories');
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectsSection id="projects">
      <h2>Projects</h2>
      <ProjectList>
        {/* Render GitHub projects */}
        {githubProjects.map((project, index) => (
          <ProjectItem key={`github-${index}`} delay={index * 0.2}>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              <h3>{project.name}</h3>
            </a>
            <p>{project.description}</p>
          </ProjectItem>
        ))}

        {/* Render manual projects */}
        {manualProjects.map((project, index) => (
          <ProjectItem key={`manual-${index}`} delay={index * 0.2}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </ProjectItem>
        ))}
      </ProjectList>
    </ProjectsSection>
  );
};

export default Projects;
